import * as React from 'react';
import { DateRange, RangeInput } from './RangeTypes';
import { MaterialUiPickersDate } from '../typings/date';
import { BasePickerProps } from '../typings/BasePicker';
import { DateRangePickerInput } from './DateRangePickerInput';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { SomeWrapper, ExtendWrapper } from '../wrappers/Wrapper';
import { AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { DesktopPopperWrapper } from '../wrappers/DesktopPopperWrapper';
import { MuiPickersAdapter, useUtils } from '../_shared/hooks/useUtils';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { DateRangePickerView, DateRangePickerViewProps } from './DateRangePickerView';

export function parseRangeInputValue(
  now: MaterialUiPickersDate,
  utils: MuiPickersAdapter,
  { value = [null, null], defaultHighlight }: BasePickerProps<RangeInput, DateRange>
) {
  return value.map(date =>
    utils.startOfDay(parsePickerInputValue(now, utils, { value: date, defaultHighlight }))
  ) as DateRange;
}

export function makeRangePicker<TWrapper extends SomeWrapper>(Wrapper: TWrapper) {
  const WrapperComponent = makeWrapperComponent<RangeInput, DateRange>(Wrapper, {
    KeyboardDateInputComponent: DateRangePickerInput,
    PureDateInputComponent: DateRangePickerInput,
  });

  function RangePickerWithStateAndWrapper({
    calendars,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    shouldDisableDate,
    showDaysOutsideCurrentMonth,
    onMonthChange,
    disableHighlightToday,
    reduceAnimations,
    ...other
  }: DateRangePickerViewProps &
    AllSharedPickerProps<RangeInput, DateRange> &
    ExtendWrapper<TWrapper>) {
    const utils = useUtils();
    const [currentlySelectingRangeEnd, setCurrentlySelectingRangeEnd] = React.useState<
      'start' | 'end'
    >('start');

    const { pickerProps, inputProps, wrapperProps } = usePickerState<RangeInput, DateRange>(other, {
      parseInput: parseRangeInputValue,
      areValuesEqual: (a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]),
      validateInput: () => undefined,
    });

    return (
      <WrapperComponent inputProps={inputProps} wrapperProps={wrapperProps} {...other}>
        <DateRangePickerView
          DateInputProps={inputProps}
          calendars={calendars}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          shouldDisableDate={shouldDisableDate}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          onMonthChange={onMonthChange}
          disableHighlightToday={disableHighlightToday}
          reduceAnimations={reduceAnimations}
          currentlySelectingRangeEnd={currentlySelectingRangeEnd}
          setCurrentlySelectingRangeEnd={setCurrentlySelectingRangeEnd}
          {...pickerProps}
        />
      </WrapperComponent>
    );
  }

  RangePickerWithStateAndWrapper.defaultProps = {
    inputFormat: 'MM',
  };

  return RangePickerWithStateAndWrapper;
}

export const DateRangePicker = makeRangePicker(DesktopPopperWrapper);
