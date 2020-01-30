import { IUtils } from '@date-io/core/IUtils';
import { DatePickerProps } from '../DatePicker';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { DateInputProps } from '../_shared/PureDateInput';

export const getDisplayDate = (
  value: ParsableDate,
  utils: IUtils<MaterialUiPickersDate>,
  {
    format,
    invalidLabel = '',
    emptyLabel,
    labelFunc,
  }: Pick<DateInputProps, 'format' | 'invalidLabel' | 'emptyLabel' | 'labelFunc'>
) => {
  const date = utils.date(value);
  const isEmpty = value === null;

  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel!);
  }

  if (isEmpty) {
    return emptyLabel || '';
  }

  return utils.isValid(date) ? utils.formatByString(date, format) : invalidLabel;
};

export interface BaseValidationProps {
  /**
   * Message, appearing when date cannot be parsed
   * @default 'Invalid Date Format'
   */
  invalidDateMessage?: React.ReactNode;
}

export interface DateValidationProps extends BaseValidationProps {
  /**
   * Error message, shown if date is less then minimal date
   * @default 'Date should not be before minimal date'
   */
  minDateMessage?: React.ReactNode;
  /**
   * Error message, shown if date is more then maximal date
   * @default 'Date should not be after maximal date'
   */
  maxDateMessage?: React.ReactNode;
}

const getComparisonMaxDate = (utils: IUtils<any>, strictCompareDates: boolean, date: Date) => {
  if (strictCompareDates) {
    return date;
  }

  return utils.endOfDay(date);
};

const getComparisonMinDate = (utils: IUtils<any>, strictCompareDates: boolean, date: Date) => {
  if (strictCompareDates) {
    return date;
  }

  return utils.startOfDay(date);
};

export const validate = (
  value: ParsableDate,
  utils: IUtils<any>,
  {
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
    strictCompareDates,
  }: Omit<DatePickerProps, 'views' | 'openTo'>
): React.ReactNode => {
  const parsedValue = utils.date(value);

  // if null - do not show error
  if (value === null) {
    return '';
  }

  if (!utils.isValid(value)) {
    return invalidDateMessage;
  }

  if (
    maxDate &&
    utils.isAfter(
      parsedValue,
      getComparisonMaxDate(utils, !!strictCompareDates, utils.date(maxDate))
    )
  ) {
    return maxDateMessage;
  }

  if (
    disableFuture &&
    utils.isAfter(parsedValue, getComparisonMaxDate(utils, !!strictCompareDates, utils.date()))
  ) {
    return maxDateMessage;
  }

  if (
    minDate &&
    utils.isBefore(
      parsedValue,
      getComparisonMinDate(utils, !!strictCompareDates, utils.date(minDate))
    )
  ) {
    return minDateMessage;
  }
  if (
    disablePast &&
    utils.isBefore(parsedValue, getComparisonMinDate(utils, !!strictCompareDates, utils.date()))
  ) {
    return minDateMessage;
  }

  return '';
};

export function pick12hOr24hFormat(
  userFormat: string | undefined,
  ampm: boolean | undefined,
  formats: { localized: string; '12h': string; '24h': string }
) {
  if (userFormat) {
    return userFormat;
  }

  if (typeof ampm === 'undefined') {
    return formats.localized;
  }

  return ampm ? formats['12h'] : formats['24h'];
}

const staticDateForValidation = new Date('2019-11-21T22:30:00.000Z');
export function checkMaskIsValidForCurrentFormat(
  mask: string,
  format: string,
  acceptRegex: RegExp,
  utils: IUtils<any>
) {
  const actualFormattedDate = utils.formatByString(utils.date(staticDateForValidation), format);
  const inferredFormatPattern = actualFormattedDate.replace(acceptRegex, '_');

  const isMaskValid = inferredFormatPattern === mask;
  // @ts-ignore
  if (!isMaskValid && process.env.NODE_ENV !== 'production') {
    console.warn(
      `The mask "${mask}" you passed is not valid for the format used ${format}. Falling down to uncontrolled not-masked input.`
    );
  }

  return isMaskValid;
}

export const maskedDateFormatter = (mask: string, numberMaskChar: string, accept: RegExp) => (
  value: string
) => {
  let result = '';
  const parsed = value.match(accept) || [];

  if (parsed.length === 0) {
    return '';
  }

  let i = 0;
  let n = 0;
  while (i < mask.length) {
    const maskChar = mask[i];
    if (maskChar === numberMaskChar && n < parsed.length) {
      const parsedChar = parsed[n];
      result += parsedChar;
      n += 1;
    } else {
      result += maskChar;
    }
    i += 1;
  }

  return result;
};
