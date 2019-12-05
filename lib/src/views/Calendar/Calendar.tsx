import * as React from 'react';
import Day from './Day';
import DayWrapper from './DayWrapper';
import SlideTransition, { SlideDirection } from './SlideTransition';
import { VariantContext } from '../../wrappers/Wrapper';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { useKeyDown } from '../../_shared/hooks/useKeyDown';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { makeStyles, useTheme, Typography } from '@material-ui/core';

export interface OuterCalendarProps {
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Custom renderer for day @DateIOType */
  renderDay?: (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => JSX.Element;
  /**
   * Enables keyboard listener for moving between days in calendar
   * @default true
   */
  allowKeyboardControl?: boolean;
  /**
   * Props to pass to left arrow button
   * @type {Partial<IconButtonProps>}
   */
  leftArrowButtonProps?: Partial<IconButtonProps>;
  /**
   * Props to pass to right arrow button
   * @type {Partial<IconButtonProps>}
   */
  rightArrowButtonProps?: Partial<IconButtonProps>;
  /** Disable specific date @DateIOType */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
  /** Callback firing on month change. Return promise to render spinner till it will not be resolved @DateIOType */
  onMonthChange?: (date: MaterialUiPickersDate) => void | Promise<void>;
  /** Custom loading indicator  */
  loadingIndicator?: JSX.Element;
  /** Min date @DateIOType */
  minDate?: MaterialUiPickersDate;
  /** Max date @DateIOType */
  maxDate?: MaterialUiPickersDate;
}

export interface CalendarProps extends OuterCalendarProps {
  /** Calendar Date @DateIOType */
  date: MaterialUiPickersDate;
  /** Calendar onChange */
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** Disable past dates */
  disablePast?: boolean;
  /** Disable future dates */
  disableFuture?: boolean;
  slideDirection: SlideDirection;
  currentMonth: MaterialUiPickersDate;
}

export const useStyles = makeStyles(theme => ({
  transitionContainer: {
    minHeight: 36 * 6,
  },
  progressContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week: {
    display: 'flex',
    justifyContent: 'center',
  },
  iconButton: {
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
  },
  previousMonthButton: {
    marginRight: 12,
  },
  daysHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    width: 36,
    height: 40,
    margin: '0 2px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.hint,
  },
}));

export const Calendar2: React.FC<CalendarProps> = ({
  date,
  onChange,
  minDate,
  maxDate,
  slideDirection,
  disableFuture,
  disablePast,
  currentMonth,
  renderDay,
  allowKeyboardControl,
  ...props
}) => {
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles();
  const now = utils.date();
  const variant = React.useContext(VariantContext);

  const validateMinMaxDate = React.useCallback(
    (day: MaterialUiPickersDate) => {
      return Boolean(
        (disableFuture && utils.isAfterDay(day, now)) ||
          (disablePast && utils.isBeforeDay(day, now)) ||
          (minDate && utils.isBeforeDay(day, utils.date(minDate))) ||
          (maxDate && utils.isAfterDay(day, utils.date(maxDate)))
      );
    },
    [disableFuture, disablePast, maxDate, minDate, now, utils]
  );

  const shouldDisableDate = React.useCallback(
    (day: MaterialUiPickersDate) => {
      return (
        validateMinMaxDate(day) || Boolean(props.shouldDisableDate && props.shouldDisableDate(day))
      );
    },
    [props, validateMinMaxDate]
  );

  const handleDaySelect = React.useCallback(
    (day: MaterialUiPickersDate, isFinish = true) => {
      onChange(utils.mergeDateAndTime(day, date), isFinish);
    },
    [date, onChange, utils]
  );

  const moveToDay = React.useCallback(
    (day: MaterialUiPickersDate) => {
      if (day && !shouldDisableDate(day)) {
        handleDaySelect(day, false);
      }
    },
    [handleDaySelect, shouldDisableDate]
  );

  useKeyDown(Boolean(allowKeyboardControl && variant !== 'static'), {
    ArrowUp: () => moveToDay(utils.addDays(date, -7)),
    ArrowDown: () => moveToDay(utils.addDays(date, 7)),
    ArrowLeft: () => moveToDay(utils.addDays(date, theme.direction === 'ltr' ? -1 : 1)),
    ArrowRight: () => moveToDay(utils.addDays(date, theme.direction === 'ltr' ? 1 : -1)),
  });

  const selectedDate = utils.startOfDay(date);
  const currentMonthNumber = utils.getMonth(currentMonth);

  return (
    <>
      <div className={classes.daysHeader}>
        {utils.getWeekdays().map(day => (
          <Typography
            key={day.toString()}
            variant="caption"
            className={classes.dayLabel}
            children={day.charAt(0).toUpperCase()}
          />
        ))}
      </div>

      <SlideTransition
        slideDirection={slideDirection}
        transKey={currentMonth!.toString()}
        className={classes.transitionContainer}
      >
        <div>
          {utils.getWeekArray(currentMonth).map(week => (
            <div key={`week-${week[0]!.toString()}`} className={classes.week}>
              {week.map(day => {
                const disabled = shouldDisableDate(day);
                const isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

                let dayComponent = (
                  <Day
                    disabled={disabled}
                    current={utils.isSameDay(day, now)}
                    hidden={!isDayInCurrentMonth}
                    selected={utils.isSameDay(selectedDate, day)}
                    children={utils.getDayText(day)}
                  />
                );

                if (renderDay) {
                  dayComponent = renderDay(day, selectedDate, isDayInCurrentMonth, dayComponent);
                }

                return (
                  <DayWrapper
                    key={day!.toString()}
                    value={day}
                    disabled={disabled}
                    dayInCurrentMonth={isDayInCurrentMonth}
                    onSelect={handleDaySelect}
                    children={dayComponent}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </SlideTransition>
    </>
  );
};

export default Calendar2;
