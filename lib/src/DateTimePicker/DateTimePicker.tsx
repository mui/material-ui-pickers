import { useUtils } from '../_shared/hooks/useUtils';
import { PureDateInput } from '../_shared/PureDateInput';
import { BaseClockViewProps } from '../views/Clock/ClockView';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { dateTimePickerDefaultProps } from '../constants/prop-types';
import {
  makePickerWithState,
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

function useOptions(props: DateTimePickerProps) {
  const utils = useUtils();

  if (props.orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    getDefaultFormat: () =>
      pick12hOr24hFormat(props.format, props.ampm, {
        '12h': utils.dateTime12hFormat,
        '24h': utils.dateTime24hFormat,
      }),
  };
}

export const DateTimePicker = makePickerWithState<DateTimePickerProps>({
  useOptions,
  Input: PureDateInput,
  DefaultToolbarComponent: DateTimePickerToolbar,
});

export const KeyboardDateTimePicker = makePickerWithState<DateTimePickerProps>({
  useOptions,
  Input: KeyboardDateInput,
  DefaultToolbarComponent: DateTimePickerToolbar,
  getCustomProps: props => ({
    refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi,
  }),
});

const defaultProps: DateTimePickerViewsProps = {
  ...dateTimePickerDefaultProps,
  // @ts-ignore
  wider: true,
  ampmInClock: true,
  orientation: 'portrait',
  openTo: 'date',
  views: ['year', 'date', 'hours', 'minutes'],
};

DateTimePicker.defaultProps = defaultProps;
DateTimePicker.displayName = 'DateTimePicker';

KeyboardDateTimePicker.defaultProps = defaultProps;
KeyboardDateTimePicker.displayName = 'DateTimePicker';
