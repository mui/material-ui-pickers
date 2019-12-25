import * as React from 'react';
import { DateTimePickerView } from '../DateTimePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { Picker, ToolbarComponentProps } from './Picker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { PureDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { StateHookOptions, usePickerState } from '../_shared/hooks/usePickerState';

export interface WithViewsProps<T extends DateTimePickerView> {
  /**
   * Array of views to show
   */
  views?: T[];
  /** First view to show */
  openTo?: T;
}

export type WithPureInputProps = DateValidationProps &
  BasePickerProps &
  ExtendWrapper<PureDateInputProps>;

export interface MakePickerOptions<T extends unknown> {
  Input: any;
  useOptions: (props: any) => StateHookOptions;
  getCustomProps?: (props: T) => Partial<T>;
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

export function makePickerWithState<T extends any>({
  Input,
  useOptions,
  getCustomProps,
  DefaultToolbarComponent,
}: MakePickerOptions<T>): React.FC<T> {
  function PickerWithState(props: T) {
    const {
      allowKeyboardControl,
      ampm,
      ampmInClock,
      autoOk,
      dateRangeIcon,
      disableFuture,
      disablePast,
      disableToolbar,
      emptyLabel,
      format,
      forwardedRef,
      hideTabs,
      initialFocusedDate,
      invalidDateMessage,
      invalidLabel,
      labelFunc,
      leftArrowButtonProps,
      leftArrowIcon,
      loadingIndicator,
      maxDate,
      maxDateMessage,
      minDate,
      minDateMessage,
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
      strictCompareDates,
      timeIcon,
      ToolbarComponent = DefaultToolbarComponent,
      value,
      variant,
      views,
      title,
      ...other
    } = props;

    const injectedProps = getCustomProps ? getCustomProps(props) : {};

    const options = useOptions(props);
    const { pickerProps, inputProps, wrapperProps } = usePickerState(props as any, options);

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
          title={title}
          allowKeyboardControl={allowKeyboardControl}
          ampm={ampm}
          ampmInClock={ampmInClock}
          dateRangeIcon={dateRangeIcon}
          disableFuture={disableFuture}
          disablePast={disablePast}
          disableToolbar={disableToolbar}
          hideTabs={hideTabs}
          leftArrowButtonProps={leftArrowButtonProps}
          leftArrowIcon={leftArrowIcon}
          loadingIndicator={loadingIndicator}
          maxDate={maxDate}
          minDate={minDate}
          minutesStep={minutesStep}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          openTo={openTo}
          orientation={orientation}
          renderDay={renderDay}
          rightArrowButtonProps={rightArrowButtonProps}
          rightArrowIcon={rightArrowIcon}
          shouldDisableDate={shouldDisableDate}
          strictCompareDates={strictCompareDates}
          timeIcon={timeIcon}
          ToolbarComponent={ToolbarComponent}
          views={views}
        />
      </Wrapper>
    );
  }

  return PickerWithState;
}
