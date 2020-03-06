import * as React from 'react';
import { DateTimePickerView } from '../DateTimePicker';
import { ParsableDate } from '../constants/prop-types';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { useParsePickerInputValue } from '../_helpers/date-utils';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { ResponsiveWrapperProps } from '../wrappers/ResponsiveWrapper';
import { ExportedDateInputProps, DateInputProps } from '../_shared/PureDateInput';
import { SomeWrapper, ExtendWrapper, OmitInnerWrapperProps } from '../wrappers/Wrapper';
import { Picker, ToolbarComponentProps, PickerProps, ExportedPickerProps } from './Picker';
import { withDateAdapterProp, WithDateAdapterProps } from '../_shared/withDateAdapterProp';

export interface WithViewsProps<T extends DateTimePickerView> {
  /**
   * Array of views to show
   */
  views?: T[];
  /** First view to show */
  openTo?: T;
}

export type WithDateInputProps = DateValidationProps & BasePickerProps & ExportedDateInputProps;

export interface MakePickerOptions<T extends unknown, TInputValue, TDateValue> {
  useDefaultProps: (props: T) => Partial<T> & { inputFormat?: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
  PickerComponent?: React.ComponentType<PickerProps<any, TInputValue, TDateValue>>;
  useParseInputValue?: (props: BasePickerProps<TInputValue, TDateValue>) => TDateValue;
  PureDateInputComponent?: React.FC<DateInputProps<TInputValue>>;
  KeyboardDateInputComponent?: React.FC<DateInputProps<TInputValue>>;
}

export function makePickerWithStateAndWrapper<
  T extends ExportedPickerProps<any> &
    DateValidationProps &
    Pick<BasePickerProps<TInputValue, TDateValue>, 'onChange' | 'value'>,
  TInputValue = ParsableDate,
  TDateValue = MaterialUiPickersDate,
  TWrapper extends SomeWrapper = any
>(
  Wrapper: TWrapper,
  {
    // @ts-ignore Technically we cannot have a default value here, but left for consistency
    PickerComponent = Picker,
    // @ts-ignore
    useParseInputValue = useParsePickerInputValue,
    KeyboardDateInputComponent,
    PureDateInputComponent,
    useDefaultProps,
    DefaultToolbarComponent,
  }: MakePickerOptions<T, TInputValue, TDateValue>
): React.FC<T & WithDateAdapterProps & ExtendWrapper<TWrapper>> {
  function PickerWithState(props: T & Partial<OmitInnerWrapperProps<ResponsiveWrapperProps>>) {
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
      ...restPropsForTextField
    } = allProps;

    const { pickerProps, inputProps, wrapperProps } = usePickerState<TInputValue, TDateValue>(
      allProps,
      useParseInputValue
    );

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

  // @ts-ignore (why prop-types validation is appearing here?)
  return withDateAdapterProp(PickerWithState);
}
