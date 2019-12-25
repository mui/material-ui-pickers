import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { DatePickerToolbar } from './DatePickerToolbar';
import { PureDateInput } from '../_shared/PureDateInput';
import { getFormatByViews } from '../_helpers/date-utils';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { datePickerDefaultProps } from '../constants/prop-types';
import { ExportedCalendarProps } from '../views/Calendar/CalendarView';
import {
  WithDateInputProps,
  makePickerWithState,
  WithViewsProps,
} from '../Picker/makePickerWithState';

export type DatePickerView = 'year' | 'date' | 'month';

export interface BaseDatePickerProps extends ExportedCalendarProps {
  /** Callback firing on year change @DateIOType */
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export type DatePickerProps = BaseDatePickerProps &
  WithDateInputProps &
  WithViewsProps<'year' | 'date' | 'month'>;

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
