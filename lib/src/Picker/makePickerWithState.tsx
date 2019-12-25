import * as React from 'react';
import { DateTimePickerView } from '../DateTimePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { Picker, ToolbarComponentProps, PickerViewProps } from './Picker';
import { StateHookOptions, usePickerState } from '../_shared/hooks/usePickerState';

export interface WithViewsProps<T extends DateTimePickerView> {
  /**
   * Array of views to show
   */
  views?: T[];
  /** First view to show */
  openTo?: T;
}

export type WithDateInputProps = DateValidationProps &
  BasePickerProps &
  ExtendWrapper<KeyboardDateInputProps>;

export interface MakePickerOptions<T extends unknown> {
  Input: any;
  useOptions: (props: any) => StateHookOptions;
  getCustomProps?: (props: T) => Partial<T>;
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

export interface ExportedByPickerProps {
  ToolbarComponent?: React.ComponentType<ToolbarComponentProps>;
}

export function makePickerWithState<
  T extends Omit<PickerViewProps<any>, 'ToolbarComponent'> &
    Pick<BasePickerProps, 'onChange' | 'value'>
>({
  Input,
  useOptions,
  getCustomProps,
  DefaultToolbarComponent,
}: MakePickerOptions<T>): React.FC<T & ExportedByPickerProps> {
  function PickerWithState(props: T & ExportedByPickerProps) {
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
      hideTabs,
      initialFocusedDate,
      invalidLabel,
      labelFunc,
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
