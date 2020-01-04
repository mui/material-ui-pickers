import { useUtils } from '../_shared/hooks/useUtils';
import { BaseClockViewProps } from '../views/Clock/ClockView';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { InlineWrapper, ModalWrapper } from '../wrappers/Wrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { dateTimePickerDefaultProps } from '../constants/prop-types';
import {
  makePickerWithStateAndWrapper,
  WithDateInputProps,
  WithViewsProps,
} from '../Picker/makePickerWithState';

export type DateTimePickerView = 'year' | 'date' | 'month' | 'hours' | 'minutes' | 'seconds';

export type BaseDateTimePickerProps = BaseClockViewProps & BaseDatePickerProps;

export interface DateTimePickerViewsProps extends BaseDateTimePickerProps {
  /** To show tabs */
  hideTabs?: boolean;
  /** Date tab icon */
  dateRangeIcon?: React.ReactNode;
  /** Time tab icon */
  timeIcon?: React.ReactNode;
}

export type DateTimePickerProps = WithDateInputProps &
  DateTimePickerViewsProps &
  WithViewsProps<'year' | 'date' | 'month' | 'hours' | 'minutes' | 'seconds'>;

function useDefaultProps({
  ampm,
  format,
  orientation = 'portrait',
  openTo = 'date',
  views = ['year', 'date', 'hours', 'minutes'],
}: DateTimePickerProps) {
  const utils = useUtils();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    ...dateTimePickerDefaultProps,
    openTo,
    views,
    wider: true,
    ampmInClock: true,
    orientation,
    refuse: ampm ? /[^\dap]+/gi : /[^\d]+/gi,
    format: pick12hOr24hFormat(format, ampm, {
      '12h': utils.formats.fullDateTime12h,
      '24h': utils.formats.fullDateTime24h,
    }),
  };
}

export const DateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(ModalWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: DateTimePickerToolbar,
});

export const KeyboardDateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  InlineWrapper,
  {
    useDefaultProps,
    DefaultToolbarComponent: DateTimePickerToolbar,
  }
);

DateTimePicker.displayName = 'DateTimePicker';
KeyboardDateTimePicker.displayName = 'DateTimePicker';
