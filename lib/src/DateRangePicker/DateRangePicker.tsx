import * as React from 'react';
import { ParsableDate } from '../constants/prop-types';
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

export type RangeInput = [ParsableDate, ParsableDate];
export type DateRange = [MaterialUiPickersDate, MaterialUiPickersDate];

interface RangePickerProps extends BasePickerProps<RangeInput, DateRange> {
  howManyCalendars: 2;
}

const RangePicker: React.FC<RangePickerProps> = ({}) => {
  return <div>makePickerWithStateAndWrapper</div>;
};

export function parseRangeInputValue(
  now: MaterialUiPickersDate,
  utils: MuiPickersAdapter,
  { value = [null, null], defaultHighlight }: BasePickerProps<RangeInput, DateRange>
) {
  return value.map(date =>
    parsePickerInputValue(now, utils, { value: date, defaultHighlight })
  );
}

export function makeRangePicker<TWrapper extends SomeWrapper>(Wrapper: TWrapper) {
  const PickerComponentWithWrapper = makePickerWithWrapper(Wrapper, {
    PickerComponent: RangePicker,
    DefaultToolbarComponent: () => null,
    KeyboardDateInputComponent: DateRangePickerInput,
    PureDateInputComponent: DateRangePickerInput,
  });

  function RangePickerWithStateAndWrapper(
    allProps: RangePickerProps & Partial<OmitInnerWrapperProps<ResponsiveWrapperProps>>
  ) {
    const { pickerProps, inputProps, wrapperProps } = usePickerState<
      RangeInput,
      DateRange
    >(allProps, parseRangeInputValue);

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
    inputFormat: 'MM'
  }

  return RangePickerWithStateAndWrapper;
}

export const DateRangePicker = makeRangePicker(DesktopWrapper);

<DateRangePicker value={[]} />;
