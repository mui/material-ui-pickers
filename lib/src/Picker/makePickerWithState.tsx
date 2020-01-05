import * as React from 'react';
import { MakeOptional } from '../typings/helpers';
import { DateTimePickerView } from '../DateTimePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { SomeWrapper, ExtendWrapper } from '../wrappers/Wrapper';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { ExportedDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { Picker, ToolbarComponentProps, PickerViewProps } from './Picker';

export interface WithViewsProps<T extends DateTimePickerView> {
  /**
   * Array of views to show
   */
  views?: T[];
  /** First view to show */
  openTo?: T;
}

export type WithDateInputProps = DateValidationProps & BasePickerProps & ExportedDateInputProps;

export interface MakePickerOptions<T extends unknown> {
  useDefaultProps: (props: T) => Partial<T> & { format: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

type ExportedPickerProps = MakeOptional<PickerViewProps<any>, 'ToolbarComponent'>;

export function makePickerWithStateAndWrapper<
  T extends ExportedPickerProps & DateValidationProps & Pick<BasePickerProps, 'onChange' | 'value'>,
  TWrapper extends SomeWrapper = any
>(
  Wrapper: TWrapper,
  { useDefaultProps, DefaultToolbarComponent }: MakePickerOptions<T>
): React.FC<T & ExtendWrapper<TWrapper>> {
  function PickerWithState(props: T & ExtendWrapper<TWrapper>) {
    const defaultProps = useDefaultProps(props);
    const allProps = { ...defaultProps, ...props };

    const {
      allowKeyboardControl,
      ampm,
      ampmInClock,
      autoOk,
      dateRangeIcon,
      disableFuture,
      disablePast,
      showToolbar,
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
      invalidDateMessage,
      minDateMessage,
      maxDateMessage,
      ...other
    } = allProps;

    const { pickerProps, inputProps, wrapperProps } = usePickerState(allProps);
    const WrapperComponent = Wrapper as SomeWrapper;

    return (
      <WrapperComponent DateInputProps={inputProps} {...wrapperProps} {...other}>
        <Picker
          {...pickerProps}
          title={title}
          allowKeyboardControl={allowKeyboardControl}
          ampm={ampm}
          ampmInClock={ampmInClock}
          dateRangeIcon={dateRangeIcon}
          disableFuture={disableFuture}
          disablePast={disablePast}
          showToolbar={showToolbar}
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
      </WrapperComponent>
    );
  }

  return PickerWithState;
}
