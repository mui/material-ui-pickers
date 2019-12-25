import { useUtils } from '../_shared/hooks/useUtils';
import { TimePickerToolbar } from './TimePickerToolbar';
import { PureDateInput } from '../_shared/PureDateInput';
import { BaseClockViewProps } from '../views/Clock/ClockView';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { timePickerDefaultProps } from '../constants/prop-types';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import {
  WithDateInputProps,
  WithViewsProps,
  makePickerWithState,
} from '../Picker/makePickerWithState';

type TimePickerView = 'hours' | 'minutes' | 'seconds';

export interface TimePickerProps
  extends BaseClockViewProps,
    WithViewsProps<'hours' | 'minutes' | 'seconds'>,
    WithDateInputProps {}

const defaultProps = {
  ...timePickerDefaultProps,
  openTo: 'hours' as TimePickerView,
  views: ['hours', 'minutes'] as TimePickerView[],
};

function useOptions(props: TimePickerProps) {
  const utils = useUtils();

  return {
    getDefaultFormat: () =>
      pick12hOr24hFormat(props.format, props.ampm, {
        '12h': utils.time12hFormat,
        '24h': utils.time24hFormat,
      }),
  };
}

export const TimePicker = makePickerWithState<TimePickerProps>({
  useOptions,
  Input: PureDateInput,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const KeyboardTimePicker = makePickerWithState<TimePickerProps>({
  useOptions,
  Input: KeyboardDateInput,
  DefaultToolbarComponent: TimePickerToolbar,
  getCustomProps: props => ({
    refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi,
  }),
});

TimePicker.defaultProps = defaultProps;

KeyboardTimePicker.defaultProps = defaultProps;
