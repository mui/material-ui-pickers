import * as React from 'react';
import { useUtils } from '../_shared/hooks/useUtils';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { validateDateValue } from '../_helpers/text-field-helper';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { withDateAdapterProp } from '../_shared/withDateAdapterProp';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { PureDateInput, DateInputProps } from '../_shared/PureDateInput';
import { AnyPickerView, AllSharedPickerProps } from './SharedPickerProps';
import { SomeWrapper, ExtendWrapper, WrapperProps } from '../wrappers/Wrapper';
import { Picker, ToolbarComponentProps, ExportedPickerProps, PickerProps } from './Picker';

type AllAvailableForOverrideProps = ExportedPickerProps<AnyPickerView>;

export interface MakePickerOptions<T extends unknown> {
  useDefaultProps: (props: T & AllSharedPickerProps) => Partial<T> & { inputFormat: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

export function makePickerWithStateAndWrapper<
  T extends AllAvailableForOverrideProps,
  TWrapper extends SomeWrapper = typeof ResponsiveWrapper
>(Wrapper: TWrapper, { useDefaultProps, DefaultToolbarComponent }: MakePickerOptions<T>) {
  const PickerWrapper = makeWrapperComponent<DateInputProps, ParsableDate, MaterialUiPickersDate>(
    Wrapper,
    {
      KeyboardDateInputComponent: KeyboardDateInput,
      PureDateInputComponent: PureDateInput,
    }
  );

  function PickerWithState(props: T & AllSharedPickerProps & ExtendWrapper<TWrapper>) {
    const utils = useUtils();
    const defaultProps = useDefaultProps(props);
    const allProps = { ...defaultProps, ...props };

    const { pickerProps, inputProps, wrapperProps } = usePickerState<
      ParsableDate,
      MaterialUiPickersDate
    >(allProps, {
      emptyValue: null,
      parseInput: parsePickerInputValue,
      validateInput: validateDateValue,
      areValuesEqual: (a, b) => utils.isEqual(a, b),
    });

    // Note that we are passing down all the value without spread.
    // It saves us 0.9kb gzip and automatic prop availability without requirement of spreading each new prop.
    return (
      <PickerWrapper
        DateInputProps={({ ...inputProps, ...allProps } as unknown) as DateInputProps}
        wrapperProps={wrapperProps}
        {...((allProps as unknown) as WrapperProps)}
      >
        <Picker
          {...pickerProps}
          DateInputProps={{ ...inputProps, ...allProps }}
          ToolbarComponent={allProps.ToolbarComponent || DefaultToolbarComponent}
          {...((allProps as unknown) as PickerProps<any>)}
        />
      </PickerWrapper>
    );
  }

  const FinalPickerComponent = withDateAdapterProp(PickerWithState);
  return React.forwardRef<HTMLInputElement, React.ComponentProps<typeof FinalPickerComponent>>(
    (props, ref) => <FinalPickerComponent {...(props as any)} forwardedRef={ref} />
  );
}
