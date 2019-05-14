import * as React from 'react';
import Calendar from '../DatePicker/components/Calendar';
import YearSelection from '../DatePicker/components/YearSelection';
import MonthSelection from '../DatePicker/components/MonthSelection';
import { MaterialUiPickersDate } from '..';
import { useUtils } from '../_shared/hooks/useUtils';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { datePickerDefaultProps } from '../constants/prop-types';
import { TimePickerView } from '../TimePicker/components/TimePickerView';

const viewsMap = {
  year: YearSelection,
  month: MonthSelection,
  date: Calendar,
  hours: TimePickerView,
  minutes: TimePickerView,
  seconds: TimePickerView,
};

type View = keyof typeof viewsMap;

export type ToolbarComponentProps = BaseDatePickerProps &
  BaseTimePickerProps & {
    views: View[];
    openView: View;
    date: MaterialUiPickersDate;
    setOpenView: (view: View) => void;
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  };

export interface PickerViewProps extends BaseDatePickerProps, BaseTimePickerProps {
  views: View[];
  openTo: View;
  disableToolbar?: boolean;
  ToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

interface PickerProps extends PickerViewProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

function useViews(
  views: View[],
  openTo: View,
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void
) {
  const [openView, setOpenView] = React.useState(
    openTo && views.includes(openTo) ? openTo : views[0]
  );

  const getNextAvailableView = React.useCallback(
    (nextView: View) => {
      if (views.includes(nextView)) {
        return nextView;
      }

      return views[views.indexOf(openView!) + 1];
    },
    [openView, views]
  );

  const handleChangeAndOpenNext = React.useCallback(
    (nextView: View) => {
      return (date: MaterialUiPickersDate, isFinish?: boolean) => {
        const nextViewToOpen = getNextAvailableView(nextView);
        if (isFinish && nextViewToOpen) {
          // do not close picker if needs to show next view
          onChange(date, false);
          setOpenView(nextViewToOpen);

          return;
        }

        onChange(date, isFinish);
      };
    },
    [getNextAvailableView, onChange]
  );

  return { handleChangeAndOpenNext, openView, setOpenView };
}

export const Picker: React.FunctionComponent<PickerProps> = props => {
  const {
    date,
    ampm,
    views,
    disableToolbar,
    disablePast,
    disableFuture,
    onChange,
    openTo,
    minutesStep,
    minDate: unparsedMinDate,
    maxDate: unparsedMaxDate,
    animateYearScrolling,
    leftArrowIcon,
    rightArrowIcon,
    renderDay,
    shouldDisableDate,
    allowKeyboardControl,
    onMonthChange,
    onYearChange,
    leftArrowButtonProps,
    rightArrowButtonProps,
    ToolbarComponent,
  } = props;

  const utils = useUtils();
  const { openView, setOpenView, handleChangeAndOpenNext } = useViews(views, openTo, onChange);

  const minDate = React.useMemo(() => utils.date(unparsedMinDate)!, [unparsedMinDate, utils]);
  const maxDate = React.useMemo(() => utils.date(unparsedMaxDate)!, [unparsedMaxDate, utils]);

  return (
    <>
      {!disableToolbar && (
        <ToolbarComponent
          date={date}
          onChange={onChange}
          setOpenView={setOpenView}
          openView={openView}
          {...props}
        />
      )}

      {openView === 'year' && (
        <YearSelection
          date={date}
          onChange={handleChangeAndOpenNext('month')}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          onYearChange={onYearChange}
          animateYearScrolling={animateYearScrolling}
        />
      )}

      {openView === 'month' && (
        <MonthSelection
          date={date}
          onChange={handleChangeAndOpenNext('date')}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          onMonthChange={onMonthChange}
        />
      )}

      {openView === 'date' && (
        <Calendar
          date={date}
          onChange={handleChangeAndOpenNext('hours')}
          onMonthChange={onMonthChange}
          disablePast={disablePast}
          disableFuture={disableFuture}
          minDate={minDate}
          maxDate={maxDate}
          leftArrowIcon={leftArrowIcon}
          leftArrowButtonProps={leftArrowButtonProps}
          rightArrowIcon={rightArrowIcon}
          rightArrowButtonProps={rightArrowButtonProps}
          renderDay={renderDay}
          shouldDisableDate={shouldDisableDate}
          allowKeyboardControl={allowKeyboardControl}
        />
      )}

      {(openView === 'hours' || openView === 'minutes' || openView === 'seconds') && (
        <TimePickerView
          date={date}
          ampm={ampm}
          type={openView}
          minutesStep={minutesStep}
          onHourChange={handleChangeAndOpenNext('minutes')}
          onMinutesChange={handleChangeAndOpenNext('seconds')}
          onSecondsChange={handleChangeAndOpenNext('seconds')}
        />
      )}
    </>
  );
};

Picker.defaultProps = {
  ...datePickerDefaultProps,
  views: Object.keys(viewsMap),
} as any;
