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
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
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
  const PickerComponentWithWrapper = makeWrapperComponent<RangeInput, DateRange>(Wrapper, {
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

    const { calendars, ...other } = allProps;

    return (
      <PickerComponentWithWrapper inputProps={inputProps} wrapperProps={wrapperProps} {...other}>
        <DateRangePickerCalendar calendars={calendars} {...pickerProps} />
      </PickerComponentWithWrapper>
    );
  }

  RangePickerWithStateAndWrapper.defaultProps = {
    inputFormat: 'MM',
  };

  return RangePickerWithStateAndWrapper;
}

export const DateRangePicker = makeRangePicker(DesktopWrapper);
