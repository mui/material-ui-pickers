import * as React from 'react';
import { BasePickerProps } from '../typings/BasePicker';
import { Picker, ToolbarComponentProps } from './Picker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { PureDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { StateHookOptions, usePickerState } from '../_shared/hooks/usePickerState';
import { KeyboardDateInput, KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import {
  BaseKeyboardPickerProps,
  useKeyboardPickerState,
} from '../_shared/hooks/useKeyboardPickerState';

export type WithKeyboardInputProps = DateValidationProps &
  BaseKeyboardPickerProps &
  ExtendWrapper<KeyboardDateInputProps>;

export type WithPureInputProps = DateValidationProps &
  BasePickerProps &
  ExtendWrapper<PureDateInputProps>;

export interface MakePickerOptions<T> {
  Input: KeyboardDateInput | PureDateInputProps;
  useState: typeof usePickerState | typeof useKeyboardPickerState;
  useOptions: (props: any) => StateHookOptions;
  getCustomProps?: (props: T) => Partial<T>;
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

// Mostly duplicate of ./WrappedPurePicker.tsx to enable tree-shaking of keyboard logic
// TODO investigate how to reduce duplications
export function makePickerWithState<T extends any>({
  Input,
  useState,
  useOptions,
  getCustomProps,
  DefaultToolbarComponent,
}: MakePickerOptions<WithKeyboardInputProps & T>): React.FC<WithKeyboardInputProps & T> {
  function WrappedKeyboardPicker(props: WithKeyboardInputProps & T) {
    const {
      allowKeyboardControl,
      ampm,
      hideTabs,
      animateYearScrolling,
      autoOk,
      disableFuture,
      disablePast,
      format,
      forwardedRef,
      initialFocusedDate,
      invalidDateMessage,
      labelFunc,
      leftArrowIcon,
      leftArrowButtonProps,
      maxDate,
      maxDateMessage,
      minDate,
      onOpen,
      onClose,
      minDateMessage,
      strictCompareDates,
      minutesStep,
      onAccept,
      onChange,
      onMonthChange,
      onYearChange,
      renderDay,
      views,
      openTo,
      rightArrowIcon,
      rightArrowButtonProps,
      shouldDisableDate,
      value,
      dateRangeIcon,
      emptyLabel,
      invalidLabel,
      timeIcon,
      orientation,
      variant,
      disableToolbar,
      loadingIndicator,
      ToolbarComponent = DefaultToolbarComponent,
      ...other
    } = props;

    const injectedProps = getCustomProps ? getCustomProps(props) : {};

    const options = useOptions(props);
    const { pickerProps, inputProps, wrapperProps } = useState(props, options);

    return (
      <Wrapper
        variant={variant}
        InputComponent={Input}
        DateInputProps={inputProps}
        {...injectedProps}
        {...wrapperProps}
        {...other}
      >
        <Picker
          {...pickerProps}
          ToolbarComponent={ToolbarComponent}
          disableToolbar={disableToolbar}
          hideTabs={hideTabs}
          orientation={orientation}
          ampm={ampm}
          views={views}
          openTo={openTo}
          allowKeyboardControl={allowKeyboardControl}
          minutesStep={minutesStep}
          animateYearScrolling={animateYearScrolling}
          disableFuture={disableFuture}
          disablePast={disablePast}
          leftArrowIcon={leftArrowIcon}
          leftArrowButtonProps={leftArrowButtonProps}
          maxDate={maxDate}
          minDate={minDate}
          strictCompareDates={strictCompareDates}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          renderDay={renderDay}
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          rightArrowIcon={rightArrowIcon}
          rightArrowButtonProps={rightArrowButtonProps}
          shouldDisableDate={shouldDisableDate}
          loadingIndicator={loadingIndicator}
        />
      </Wrapper>
    );
  }

  return WrappedKeyboardPicker;
}
