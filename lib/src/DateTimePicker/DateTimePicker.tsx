import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';
import { InlineWrapper, ModalWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { WithViewsProps, AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { dateTimePickerDefaultProps, ParsableDate } from '../constants/prop-types';
import { DateAndTimeValidationError, validateDateAndTime } from './date-time-utils';
import { makeValidationHook, ValidationProps } from '../_shared/hooks/useValidation';

export type DateTimePickerView = 'year' | 'date' | 'month' | 'hours' | 'minutes' | 'seconds';

export interface DateTimePickerProps
  extends WithViewsProps<'year' | 'date' | 'month' | 'hours' | 'minutes'>,
    ValidationProps<DateAndTimeValidationError, ParsableDate>,
    ExportedClockViewProps,
    ExportedCalendarViewProps {
  /** To show tabs */
  hideTabs?: boolean;
  /** Date tab icon */
  dateRangeIcon?: React.ReactNode;
  /** Time tab icon */
  timeIcon?: React.ReactNode;
  /** Minimal selectable moment of time with binding to date, to set min time in each day use `minTime` */
  minDateTime?: ParsableDate;
  /** Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime` */
  maxDateTime?: ParsableDate;
  /** Date format, that is displaying in toolbar */
  toolbarFormat?: string;
}

function useDefaultProps({
  ampm,
  mask,
  inputFormat,
  orientation = 'portrait',
  maxDateTime: __maxDateTime,
  minDateTime: __minDateTime,
  openTo = 'date',
  views = ['year', 'date', 'hours', 'minutes'],
}: DateTimePickerProps & AllSharedPickerProps) {
  const utils = useUtils();
  const minDateTime = useParsedDate(__minDateTime);
  const maxDateTime = useParsedDate(__maxDateTime);
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    ...dateTimePickerDefaultProps,
    openTo,
    views,
    ampm: willUseAmPm,
    ampmInClock: true,
    orientation,
    showToolbar: true,
    minDate: minDateTime,
    minTime: minDateTime,
    maxDate: maxDateTime,
    maxTime: maxDateTime,
    disableTimeValidationIgnoreDatePart: Boolean(minDateTime || maxDateTime),
    acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
    mask: mask || willUseAmPm ? '__/__/____ __:__ _M' : '__/__/____ __:__',
    inputFormat: pick12hOr24hFormat(inputFormat, ampm, {
      localized: utils.formats.keyboardDateTime,
      '12h': utils.formats.keyboardDateTime12h,
      '24h': utils.formats.keyboardDateTime24h,
    }),
  };
}

const useValidation = makeValidationHook<
  DateAndTimeValidationError,
  ParsableDate,
  DateTimePickerProps
>(validateDateAndTime);

const dateTimePickerConfig = {
  useDefaultProps,
  useValidation,
  DefaultToolbarComponent: DateTimePickerToolbar,
};

export const DateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  ResponsiveWrapper,
  dateTimePickerConfig
);

export const DesktopDateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  InlineWrapper,
  dateTimePickerConfig
);

export const MobileDateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  ModalWrapper,
  dateTimePickerConfig
);

export const StaticDateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  StaticWrapper,
  dateTimePickerConfig
);

<DateTimePicker onError={console.log} />;
