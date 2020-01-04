import { useUtils } from '../_shared/hooks/useUtils';
import { TimePickerToolbar } from './TimePickerToolbar';
import { BaseClockViewProps } from '../views/Clock/ClockView';
import { timePickerDefaultProps } from '../constants/prop-types';
import { ModalWrapper, InlineWrapper } from '../wrappers/Wrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import {
  WithDateInputProps,
  WithViewsProps,
  makePickerWithStateAndWrapper,
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
        '12h': utils.formats.fullTime12h,
        '24h': utils.formats.fullTime24h,
      }),
  };
}

export const TimePicker = makePickerWithStateAndWrapper<TimePickerProps>(ModalWrapper, {
  useOptions,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const KeyboardTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(InlineWrapper, {
  useOptions,
  DefaultToolbarComponent: TimePickerToolbar,
  getCustomProps: (props: TimePickerProps) => ({
    refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi,
  }),
});

TimePicker.defaultProps = defaultProps;

KeyboardTimePicker.defaultProps = defaultProps;
