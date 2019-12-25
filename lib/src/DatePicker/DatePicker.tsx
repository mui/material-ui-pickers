import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { DatePickerToolbar } from './DatePickerToolbar';
import { getFormatByViews } from '../_helpers/date-utils';
import { datePickerDefaultProps } from '../constants/prop-types';
import { ExportedCalendarProps } from '../views/Calendar/CalendarView';
import { ModalWrapper, InlineWrapper, StaticWrapper } from '../wrappers/Wrapper';
import {
  WithDateInputProps,
  makePickerWithStateAndWrapper,
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

const datePickerConfig = {
  useOptions,
  DefaultToolbarComponent: DatePickerToolbar,
};

export const DatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  ModalWrapper,
  datePickerConfig
);

export const KeyboardDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  InlineWrapper,
  datePickerConfig
);

export const StaticDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  StaticWrapper,
  datePickerConfig
);

const defaultProps = {
  ...datePickerDefaultProps,
  openTo: 'date' as const,
  views: ['year', 'date'] as const,
};

DatePicker.defaultProps = defaultProps;

KeyboardDatePicker.defaultProps = defaultProps;
