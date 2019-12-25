import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { DatePickerToolbar } from './DatePickerToolbar';
import { PureDateInput } from '../_shared/PureDateInput';
import { getFormatByViews } from '../_helpers/date-utils';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { ExportedCalendarProps } from '../views/Calendar/CalendarView';
import { datePickerDefaultProps, ParsableDate } from '../constants/prop-types';
import {
  WithDateInputProps,
  makePickerWithState,
  WithViewsProps,
} from '../Picker/makePickerWithState';

export type DatePickerView = 'year' | 'date' | 'month';

export interface BaseDatePickerProps extends ExportedCalendarProps {
  /**
   * Min selectable date
   * @default Date(1900-01-01)
   */
  minDate?: ParsableDate;
  /**
   * Max selectable date
   * @default Date(2100-01-01)
   */
  maxDate?: ParsableDate;

  /**
   * Compare dates by the exact timestamp, instead of start/end of date
   * @default false
   */
  strictCompareDates?: boolean;

  /**
   * Disable past dates
   * @default false
   */
  disablePast?: boolean;
  /**
   * Disable future dates
   * @default false
   */
  disableFuture?: boolean;
  /** Callback firing on year change @DateIOType */
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

type DatePickerProps = WithDateInputProps & WithViewsProps<DatePickerView>;

function useOptions(props: DatePickerProps) {
  const utils = useUtils();

  return {
    getDefaultFormat: () => getFormatByViews(props.views!, utils),
  };
}

export const DatePicker = makePickerWithState<DatePickerProps>({
  useOptions,
  Input: PureDateInput,
  DefaultToolbarComponent: DatePickerToolbar,
});

export const KeyboardDatePicker = makePickerWithState<DatePickerProps>({
  useOptions,
  Input: KeyboardDateInput,
  DefaultToolbarComponent: DatePickerToolbar,
});

const defaultProps = {
  ...datePickerDefaultProps,
  openTo: 'date' as DatePickerView,
  views: ['year', 'date'] as DatePickerView[],
};

DatePicker.defaultProps = defaultProps;

KeyboardDatePicker.defaultProps = defaultProps;
