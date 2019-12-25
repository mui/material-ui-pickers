import * as React from 'react';
import { MakeOptional } from '../typings/helpers';
import { DateTimePickerView } from '../DateTimePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { ExportedDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { SomeWrapper, getWrapperVariant } from '../wrappers/Wrapper';
import { Picker, ToolbarComponentProps, PickerViewProps } from './Picker';
import { StateHookOptions, usePickerState } from '../_shared/hooks/usePickerState';

export interface WithViewsProps<T extends DateTimePickerView> {
  /**
   * Array of views to show
   */
  views?: readonly T[] | T[];
  /** First view to show */
  openTo?: T;
}

export type WithDateInputProps = DateValidationProps & BasePickerProps & ExportedDateInputProps;

export interface MakePickerOptions<T extends unknown> {
  useOptions: (props: any) => StateHookOptions;
  getCustomProps?: (props: T) => Partial<T>;
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

type ExportedPickerProps = MakeOptional<PickerViewProps<any>, 'ToolbarComponent'>;

export function makePickerWithStateAndWrapper<
  T extends Omit<ExportedPickerProps, 'wrapperVariant'> &
    Pick<BasePickerProps, 'onChange' | 'value'>
>(
  Wrapper: SomeWrapper,
  { useOptions, getCustomProps, DefaultToolbarComponent }: MakePickerOptions<T>
): React.FC<T> {
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
      views,
      title,
      ...other
    } = props;

    const injectedProps = getCustomProps ? getCustomProps(props) : {};

    const options = useOptions(props);
    const wrapperVariant = getWrapperVariant(Wrapper);
    const { pickerProps, inputProps, wrapperProps } = usePickerState(props as any, options);

    return (
      <Wrapper DateInputProps={inputProps} {...injectedProps} {...wrapperProps} {...other}>
        <Picker
          {...pickerProps}
          title={title}
          wrapperVariant={wrapperVariant}
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
