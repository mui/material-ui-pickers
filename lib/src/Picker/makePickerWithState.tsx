import * as React from 'react';
import { ParsableDate } from '../constants/prop-types';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { PureDateInput } from '../_shared/PureDateInput';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { makePickerWithWrapper } from './makePickerWithWrapper';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { SomeWrapper, ExtendWrapper } from '../wrappers/Wrapper';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { WithDateAdapterProps } from '../_shared/withDateAdapterProp';
import { Picker, ToolbarComponentProps, ExportedPickerProps } from './Picker';

export interface MakePickerOptions<T extends unknown> {
  useDefaultProps: (props: T) => Partial<T> & { inputFormat: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

export function makePickerWithStateAndWrapper<
  T extends ExportedPickerProps<ParsableDate, MaterialUiPickersDate> &
    DateValidationProps &
    Pick<BasePickerProps<ParsableDate, MaterialUiPickersDate>, 'onChange' | 'value'>,
  TWrapper extends SomeWrapper = any
>(
  Wrapper: TWrapper,
  { useDefaultProps, DefaultToolbarComponent }: MakePickerOptions<T>
) {
  const PickerComponentWithWrapper = makePickerWithWrapper(Wrapper, {
    PickerComponent: Picker,
    DefaultToolbarComponent: DefaultToolbarComponent,
    KeyboardDateInputComponent: KeyboardDateInput,
    PureDateInputComponent: PureDateInput,
  });

  function PickerWithState(props: T & WithDateAdapterProps & ExtendWrapper<TWrapper>) {
    const defaultProps = useDefaultProps(props);
    const allProps = { ...defaultProps, ...props };

    const { pickerProps, inputProps, wrapperProps } = usePickerState<
      ParsableDate,
      MaterialUiPickersDate
    >(allProps, parsePickerInputValue);

    return (
      // @ts-ignore
      <PickerComponentWithWrapper
        pickerProps={pickerProps}
        inputProps={inputProps}
        wrapperProps={wrapperProps}
        {...allProps}
      />
    );
  }

  return PickerWithState;
}
