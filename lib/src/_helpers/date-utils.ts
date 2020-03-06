import { arrayIncludes } from './utils';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { BasePickerProps } from '../typings/BasePicker';
import { DatePickerView } from '../DatePicker/DatePicker';
import { useNow, useUtils } from '../_shared/hooks/useUtils';

interface FindClosestDateParams {
  date: MaterialUiPickersDate;
  utils: IUtils<MaterialUiPickersDate>;
  minDate: MaterialUiPickersDate;
  maxDate: MaterialUiPickersDate;
  disableFuture: boolean;
  disablePast: boolean;
  shouldDisableDate: (date: MaterialUiPickersDate) => boolean;
}

export const findClosestEnabledDate = ({
  date,
  utils,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  shouldDisableDate,
}: FindClosestDateParams) => {
  const today = utils.startOfDay(utils.date());

  if (disablePast && utils.isBefore(minDate!, today)) {
    minDate = today;
  }

  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }

  let forward = date;
  let backward = date;
  if (utils.isBefore(date, minDate)) {
    forward = utils.date(minDate);
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = utils.date(maxDate);
    }

    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }
    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }

    if (forward) {
      if (!shouldDisableDate(forward)) {
        return forward;
      }
      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!shouldDisableDate(backward)) {
        return backward;
      }
      backward = utils.addDays(backward, -1);
    }
  }

  // fallback to today if no enabled days
  return utils.date();
};

export const isYearOnlyView = (views: readonly DatePickerView[]) =>
  views.length === 1 && views[0] === 'year';

export const isYearAndMonthViews = (views: readonly DatePickerView[]) =>
  views.length === 2 && arrayIncludes(views, 'month') && arrayIncludes(views, 'year');

export const getFormatByViews = (
  views: readonly DatePickerView[],
  utils: IUtils<MaterialUiPickersDate>
) => {
  if (isYearOnlyView(views)) {
    return utils.formats.year;
  }

  if (isYearAndMonthViews(views)) {
    return utils.formats.monthAndYear;
  }

  return utils.formats.keyboardDate;
};

const useValueToDate = (
  utils: IUtils<MaterialUiPickersDate>,
  { value, defaultHighlight }: BasePickerProps
) => {
  const now = useNow();
  const date = utils.date(value || defaultHighlight || now);

  return date && utils.isValid(date) ? date : now;
};

export function useParsePickerInputValue(props: BasePickerProps): MaterialUiPickersDate | null {
  const utils = useUtils();
  const date = useValueToDate(utils, props);
  const inputFormat = props.inputFormat;

  if (!inputFormat) {
    throw new Error('format prop is required');
  }

  return date;
}
