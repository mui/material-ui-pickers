import * as React from 'react';
import { MaterialUiPickersDate } from '../typings/date';
import { BasePickerProps } from '../typings/BasePicker';
import { MobileWrapper } from '../wrappers/MobileWrapper';
import { DateRangeInputProps } from './DateRangePickerInput';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { DateRange as DateRangeType, RangeInput } from './RangeTypes';
import { ResponsivePopperWrapper } from '../wrappers/ResponsiveWrapper';
import { DesktopPopperWrapper } from '../wrappers/DesktopPopperWrapper';
import { MuiPickersAdapter, useUtils } from '../_shared/hooks/useUtils';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { SomeWrapper, ExtendWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { DateRangePickerView, ExportedDateRangePickerViewProps } from './DateRangePickerView';
import { DateRangePickerInput, ExportedDateRangePickerInputProps } from './DateRangePickerInput';

export function parseRangeInputValue(
  now: MaterialUiPickersDate,
  utils: MuiPickersAdapter,
  { value = [null, null], defaultHighlight }: BasePickerProps<RangeInput, DateRange>
) {
  return value.map(date =>
    date === null
      ? null
      : utils.startOfDay(parsePickerInputValue(now, utils, { value: date, defaultHighlight }))
  ) as DateRange;
}

export function makeRangePicker<TWrapper extends SomeWrapper>(Wrapper: TWrapper) {
  const WrapperComponent = makeWrapperComponent<DateRangeInputProps, RangeInput, DateRange>(
    Wrapper,
    {
      KeyboardDateInputComponent: DateRangePickerInput,
      PureDateInputComponent: DateRangePickerInput,
    }
  );

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
    value,
    onChange,
    inputFormat: passedInputFormat,
    ...restPropsForTextField
  }: ExportedDateRangePickerViewProps &
    ExportedDateRangePickerInputProps &
    AllSharedPickerProps<RangeInput, DateRange> &
    ExtendWrapper<TWrapper>) {
    const utils = useUtils();
    const [currentlySelectingRangeEnd, setCurrentlySelectingRangeEnd] = React.useState<
      'start' | 'end'
    >('start');

    const pickerStateProps = {
      ...restPropsForTextField,
      value,
      onChange,
      inputFormat: passedInputFormat || utils.formats.keyboardDate,
    };

    const { pickerProps, inputProps, wrapperProps } = usePickerState<RangeInput, DateRange>(
      pickerStateProps,
      {
        parseInput: parseRangeInputValue,
        areValuesEqual: (a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]),
        validateInput: () => undefined,
        emptyValue: [null, null],
      }
    );

    return (
      <WrapperComponent
        wrapperProps={wrapperProps}
        inputProps={{
          ...inputProps,
          currentlySelectingRangeEnd,
          setCurrentlySelectingRangeEnd,
        }}
        {...restPropsForTextField}
      >
        <DateRangePickerView
          open={wrapperProps.open}
          DateInputProps={{
            currentlySelectingRangeEnd,
            setCurrentlySelectingRangeEnd,
            ...restPropsForTextField,
            ...inputProps,
          }}
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
    mask: '__/__/____',
    variant: 'outlined',
  };

  return RangePickerWithStateAndWrapper;
}

// TODO replace with new export type syntax
export type DateRange = DateRangeType;

export const DateRangePicker = makeRangePicker(ResponsivePopperWrapper);

export const DesktopDateRangePicker = makeRangePicker(DesktopPopperWrapper);

export const MobileDateRangePicker = makeRangePicker(MobileWrapper);

export const StaticDateRangePicker = makeRangePicker(StaticWrapper);
