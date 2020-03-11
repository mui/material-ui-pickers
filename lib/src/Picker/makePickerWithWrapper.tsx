import React from 'react';
import { BasePickerProps } from '../typings/BasePicker';
import { DateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { ResponsiveWrapperProps } from '../wrappers/ResponsiveWrapper';
import { ToolbarComponentProps, PickerProps, ExportedPickerProps } from './Picker';
import { WithDateAdapterProps, withDateAdapterProp } from '../_shared/withDateAdapterProp';
import {
  OmitInnerWrapperProps,
  SomeWrapper,
  ExtendWrapper,
  WrapperProps,
} from '../wrappers/Wrapper';

interface MakePickerOptions<TInputValue, TDateValue> {
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
  PickerComponent: React.ComponentType<PickerProps<any, TInputValue, TDateValue>>;
  PureDateInputComponent?: React.FC<DateInputProps<TInputValue>>;
  KeyboardDateInputComponent?: React.FC<DateInputProps<TInputValue>>;
}

type AllPickerProps<TInputValue, TDateValue> = ExportedPickerProps<any> &
  DateValidationProps &
  Pick<BasePickerProps<TInputValue, TDateValue>, 'onChange' | 'value'>;

interface WithWrapperProps<TInputValue, TDateValue> {
  inputProps: DateInputProps;
  wrapperProps: Omit<WrapperProps, 'DateInputProps'>;
  pickerProps: Omit<PickerProps<any, TInputValue, TDateValue>, 'DateInputProps'>;
}

export function makePickerWithWrapper<
  TInputValue,
  TDateValue,
  TProps extends AllPickerProps<TInputValue, TDateValue> &
    WithWrapperProps<TInputValue, TDateValue>,
  TWrapper extends SomeWrapper = any
>(
  Wrapper: TWrapper,
  {
    PickerComponent,
    KeyboardDateInputComponent,
    PureDateInputComponent,
    DefaultToolbarComponent,
  }: MakePickerOptions<TInputValue, TDateValue>
): React.FC<TProps & WithDateAdapterProps & ExtendWrapper<TWrapper>> {
  function PickerWithState(props: TProps & Partial<OmitInnerWrapperProps<ResponsiveWrapperProps>>) {
    const {
      allowKeyboardControl,
      ampm,
      ampmInClock,
      autoOk,
      dateRangeIcon,
      disableFuture,
      disablePast,
      showToolbar,
      inputFormat,
      hideTabs,
      defaultHighlight,
      leftArrowButtonProps,
      leftArrowIcon,
      loadingIndicator,
      maxDate,
      minDate,
      minutesStep,
      onAccept,
      onChange,
      onClose,
      onMonthChange,
      onOpen,
      onYearChange,
      openTo,
      orientation,
      renderDay,
      rightArrowButtonProps,
      rightArrowIcon,
      shouldDisableDate,
      shouldDisableTime,
      strictCompareDates,
      timeIcon,
      toolbarFormat,
      ToolbarComponent = DefaultToolbarComponent,
      value,
      views,
      toolbarTitle,
      invalidDateMessage,
      minDateMessage,
      wider,
      showTabs,
      maxDateMessage,
      disableTimeValidationIgnoreDatePart,
      showDaysOutsideCurrentMonth,
      disableHighlightToday,
      // WrapperProps
      clearable,
      clearLabel,
      DialogProps,
      PopoverProps,
      okLabel,
      cancelLabel,
      todayLabel,
      minTime,
      maxTime,
      inputProps,
      wrapperProps,
      pickerProps,
      ...restPropsForTextField
    } = props;

    const WrapperComponent = Wrapper as SomeWrapper;

    return (
      <WrapperComponent
        clearable={clearable}
        clearLabel={clearLabel}
        DialogProps={DialogProps}
        okLabel={okLabel}
        todayLabel={todayLabel}
        cancelLabel={cancelLabel}
        DateInputProps={inputProps}
        KeyboardDateInputComponent={KeyboardDateInputComponent}
        PureDateInputComponent={PureDateInputComponent}
        wider={wider}
        showTabs={showTabs}
        {...wrapperProps}
        {...restPropsForTextField}
      >
        <PickerComponent
          {...pickerProps}
          DateInputProps={{ ...inputProps, ...restPropsForTextField }}
          // @ts-ignore
          allowKeyboardControl={allowKeyboardControl}
          ampm={ampm}
          ampmInClock={ampmInClock}
          dateRangeIcon={dateRangeIcon}
          disableFuture={disableFuture}
          disableHighlightToday={disableHighlightToday}
          disablePast={disablePast}
          disableTimeValidationIgnoreDatePart={disableTimeValidationIgnoreDatePart}
          hideTabs={hideTabs}
          leftArrowButtonProps={leftArrowButtonProps}
          leftArrowIcon={leftArrowIcon}
          loadingIndicator={loadingIndicator}
          maxDate={maxDate}
          maxTime={maxTime}
          minDate={minDate}
          minTime={minTime}
          minutesStep={minutesStep}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          openTo={openTo}
          orientation={orientation}
          renderDay={renderDay}
          rightArrowButtonProps={rightArrowButtonProps}
          rightArrowIcon={rightArrowIcon}
          shouldDisableDate={shouldDisableDate}
          shouldDisableTime={shouldDisableTime}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          showToolbar={showToolbar}
          strictCompareDates={strictCompareDates}
          timeIcon={timeIcon}
          toolbarFormat={toolbarFormat}
          ToolbarComponent={ToolbarComponent}
          // @ts-ignore
          toolbarTitle={toolbarTitle || restPropsForTextField.label}
          views={views}
        />
      </WrapperComponent>
    );
  }

  return withDateAdapterProp(PickerWithState);
}
