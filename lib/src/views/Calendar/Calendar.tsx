import * as React from 'react';
import Day from './Day';
import DayWrapper from './DayWrapper';
import SlideTransition, { SlideDirection, slideAnimationDuration } from './SlideTransition';
import { WrapperVariant } from '../../wrappers/Wrapper';
import { MaterialUiPickersDate } from '../../typings/date';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { findClosestEnabledDate } from '../../_helpers/date-utils';
import { makeStyles, useTheme, Typography } from '@material-ui/core';
import { useGlobalKeyDown, keycode } from '../../_shared/hooks/useKeyDown';

export interface CalendarProps {
  /** Calendar Date @DateIOType */
  date: MaterialUiPickersDate;
  /** Calendar onChange */
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /**
   * Disable past dates
   * @default false
   */
  disablePast?: boolean;
  /**
   * Disable future dates
   * @default false
   */
  disableFuture?: boolean;
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
  /** Custom loading indicator  */
  loadingIndicator?: JSX.Element;
  minDate?: MaterialUiPickersDate;
  maxDate?: MaterialUiPickersDate;
  isDateDisabled: (day: MaterialUiPickersDate) => boolean;
  slideDirection: SlideDirection;
  currentMonth: MaterialUiPickersDate;
  onMonthChange: (date: MaterialUiPickersDate) => void;
  reduceAnimations: boolean;
  wrapperVariant: WrapperVariant | null;
}

export const useStyles = makeStyles(theme => ({
  transitionContainer: {
    minHeight: 36 * 6 + 20,
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

export const Calendar: React.FC<CalendarProps> = ({
  date,
  onChange,
  minDate,
  maxDate,
  slideDirection,
  disableFuture,
  disablePast,
  currentMonth,
  onMonthChange,
  renderDay,
  reduceAnimations,
  allowKeyboardControl,
  wrapperVariant,
  isDateDisabled,
}) => {
  const now = useNow();
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles();
  const [focusedDay, setFocusedDay] = React.useState<MaterialUiPickersDate>(date);

  const handleDaySelect = React.useCallback(
    (day: MaterialUiPickersDate, isFinish = true) => {
      onChange(utils.mergeDateAndTime(day, date), isFinish);
    },
    [date, onChange, utils]
  );

  const focusDay = React.useCallback(
    (day: MaterialUiPickersDate) => {
      if (day && !isDateDisabled(day)) {
        if (!utils.isSameMonth(day, currentMonth)) {
          onMonthChange(utils.startOfMonth(day));

          if (!reduceAnimations) {
            setTimeout(() => setFocusedDay(day), slideAnimationDuration);
            return;
          }
        }

        setFocusedDay(day);
      }
    },
    [currentMonth, isDateDisabled, onMonthChange, reduceAnimations, utils]
  );

  React.useEffect(() => {
    if (isDateDisabled(date)) {
      const closestEnabledDate = findClosestEnabledDate({
        date,
        utils,
        minDate: utils.date(minDate),
        maxDate: utils.date(maxDate),
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled,
      });

      handleDaySelect(closestEnabledDate, false);
    }
  }, []); // eslint-disable-line

  useGlobalKeyDown(Boolean(allowKeyboardControl && wrapperVariant !== 'static'), {
    [keycode.Enter]: () => handleDaySelect(date, true),
    [keycode.ArrowUp]: () => focusDay(utils.addDays(focusedDay, -7)),
    [keycode.ArrowDown]: () => focusDay(utils.addDays(focusedDay, 7)),
    [keycode.ArrowLeft]: () =>
      focusDay(utils.addDays(focusedDay, theme.direction === 'ltr' ? -1 : 1)),
    [keycode.ArrowRight]: () =>
      focusDay(utils.addDays(focusedDay, theme.direction === 'ltr' ? 1 : -1)),
  });

  const selectedDate = utils.startOfDay(date);
  const currentMonthNumber = utils.getMonth(currentMonth);

  return (
    <>
      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, i) => (
          <Typography
            key={day + i.toString()}
            variant="caption"
            className={classes.dayLabel}
            children={day.charAt(0).toUpperCase()}
          />
        ))}
      </div>

      <SlideTransition
        reduceAnimations={reduceAnimations}
        slideDirection={slideDirection}
        transKey={currentMonth!.toString()}
        className={classes.transitionContainer}
      >
        <div style={{ overflow: 'hidden' }}>
          {utils.getWeekArray(currentMonth).map(week => (
            <div key={`week-${week[0]!.toString()}`} className={classes.week}>
              {week.map(day => {
                const disabled = isDateDisabled(day);
                const isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

                let dayComponent = (
                  <Day
                    day={day}
                    disabled={disabled}
                    focused={utils.isSameDay(day, focusedDay)}
                    current={utils.isSameDay(day, now)}
                    hidden={!isDayInCurrentMonth}
                    selected={utils.isSameDay(selectedDate, day)}
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

export default Calendar;
