import * as React from 'react';
import { DateRange, RangeInput } from './RangeTypes';
import { MaterialUiPickersDate } from '../typings/date';
import { BasePickerProps } from '../typings/BasePicker';
import { DesktopWrapper } from '../wrappers/DesktopWrapper';
import { DateRangePickerInput } from './DateRangePickerInput';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { ResponsiveWrapperProps } from '../wrappers/ResponsiveWrapper';
import { makePickerWithWrapper } from '../Picker/makePickerWithWrapper';
import { SomeWrapper, OmitInnerWrapperProps } from '../wrappers/Wrapper';
import { DateRangePickerCalendar, DateRangePickerCalendarProps } from './DateRangePickerCalendar';

export function parseRangeInputValue(
  now: MaterialUiPickersDate,
  utils: MuiPickersAdapter,
  { value = [null, null], defaultHighlight }: BasePickerProps<RangeInput, DateRange>
) {
  return value.map(date =>
    parsePickerInputValue(now, utils, { value: date, defaultHighlight })
  ) as DateRange;
}

export function makeRangePicker<TWrapper extends SomeWrapper>(Wrapper: TWrapper) {
  const PickerComponentWithWrapper = makePickerWithWrapper<
    RangeInput,
    DateRange,
    DateRangePickerCalendarProps & Pick<BasePickerProps<RangeInput, DateRange>, 'onChange' | 'value'>
  >(Wrapper, {
    PickerComponent: DateRangePickerCalendar,
    DefaultToolbarComponent: () => null,
    KeyboardDateInputComponent: DateRangePickerInput,
    PureDateInputComponent: DateRangePickerInput,
  });

  function RangePickerWithStateAndWrapper(
    allProps: DateRangePickerCalendarProps &
      Pick<BasePickerProps<RangeInput, DateRange>, 'onChange' | 'value'> &
      Partial<OmitInnerWrapperProps<ResponsiveWrapperProps>>
  ) {
    const { pickerProps, inputProps, wrapperProps } = usePickerState<RangeInput, DateRange>(
      allProps,
      parseRangeInputValue
    );

    return (
      <PickerComponentWithWrapper
        pickerProps={pickerProps}
        inputProps={inputProps}
        wrapperProps={wrapperProps}
        {...allProps}
      />
    );
  }

  RangePickerWithStateAndWrapper.defaultProps = {
    inputFormat: 'MM',
  };

  return RangePickerWithStateAndWrapper;
}

export const DateRangePicker = makeRangePicker(DesktopWrapper);
