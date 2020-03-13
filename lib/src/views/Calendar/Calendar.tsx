import * as React from 'react';
import clsx from 'clsx';
import DayWrapper from './DayWrapper';
import SlideTransition, { SlideDirection } from './SlideTransition';
import { Day, DayProps } from './Day';
import { MaterialUiPickersDate } from '../../typings/date';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { findClosestEnabledDate } from '../../_helpers/date-utils';
import { makeStyles, useTheme, Typography } from '@material-ui/core';
import { useGlobalKeyDown, keycode } from '../../_shared/hooks/useKeyDown';

export interface ExportedCalendarProps
  extends Pick<DayProps, 'disableHighlightToday' | 'showDaysOutsideCurrentMonth'> {
  /** Calendar onChange */
  onChange: PickerOnChangeFn;
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
  /** Custom renderer for day. Check [DayComponentProps api](https://material-ui-pickers.dev/api/Day) @DateIOType */
  renderDay?: (
    day: MaterialUiPickersDate,
    selectedDates: MaterialUiPickersDate[],
    DayComponentProps: DayProps
  ) => JSX.Element;
  /**
   * Enables keyboard listener for moving between days in calendar
   * @default currentWrapper !== 'static'
   */
  allowKeyboardControl?: boolean;
  /** Custom loading indicator  */
  loadingIndicator?: JSX.Element;
}

export interface CalendarProps extends ExportedCalendarProps {
  date: MaterialUiPickersDate | MaterialUiPickersDate[];
  minDate?: MaterialUiPickersDate;
  maxDate?: MaterialUiPickersDate;
  isDateDisabled: (day: MaterialUiPickersDate) => boolean;
  slideDirection: SlideDirection;
  currentMonth: MaterialUiPickersDate;
  reduceAnimations: boolean;
  focusedDay: MaterialUiPickersDate | null;
  changeFocusedDay: (newFocusedDay: MaterialUiPickersDate) => void;
  isMonthSwitchingAnimating: boolean;
  onMonthSwitchingAnimationEnd: () => void;
  allowOverflowingSlideTransition?: boolean;
}

export const useStyles = makeStyles(theme => ({
  transitionContainer: {
    minHeight: 36 * 6 + 20,
  },
  transitionContainerOverflowAllowed: {
    overflowX: 'visible',
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
  isMonthSwitchingAnimating,
  onMonthSwitchingAnimationEnd,
  focusedDay,
  changeFocusedDay,
  onChange,
  minDate,
  maxDate,
  slideDirection,
  disableFuture,
  disablePast,
  currentMonth,
  renderDay,
  reduceAnimations,
  allowKeyboardControl,
  isDateDisabled,
  disableHighlightToday,
  showDaysOutsideCurrentMonth,
  allowOverflowingSlideTransition,
}) => {
  const now = useNow();
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles();

  const handleDaySelect = React.useCallback(
    (day: MaterialUiPickersDate, isFinish: boolean | symbol = true) => {
      onChange(Array.isArray(date) ? day : utils.mergeDateAndTime(day, date), isFinish);
    },
    [date, onChange, utils]
  );

  const initialDate = Array.isArray(date) ? date[0] : date;
  React.useEffect(() => {
    if (isDateDisabled(initialDate)) {
      const closestEnabledDate = findClosestEnabledDate({
        utils,
        date: initialDate,
        minDate: utils.date(minDate),
        maxDate: utils.date(maxDate),
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled,
      });

      handleDaySelect(closestEnabledDate, false);
    }
  }, []); // eslint-disable-line

  const nowFocusedDay = focusedDay || initialDate;
  useGlobalKeyDown(Boolean(allowKeyboardControl), {
    [keycode.ArrowUp]: () => changeFocusedDay(utils.addDays(nowFocusedDay, -7)),
    [keycode.ArrowDown]: () => changeFocusedDay(utils.addDays(nowFocusedDay, 7)),
    [keycode.ArrowLeft]: () =>
      changeFocusedDay(utils.addDays(nowFocusedDay, theme.direction === 'ltr' ? -1 : 1)),
    [keycode.ArrowRight]: () =>
      changeFocusedDay(utils.addDays(nowFocusedDay, theme.direction === 'ltr' ? 1 : -1)),
    [keycode.Home]: () => changeFocusedDay(utils.startOfWeek(nowFocusedDay)),
    [keycode.End]: () => changeFocusedDay(utils.endOfWeek(nowFocusedDay)),
    [keycode.PageUp]: () => changeFocusedDay(utils.getNextMonth(nowFocusedDay)),
    [keycode.PageDown]: () => changeFocusedDay(utils.getPreviousMonth(nowFocusedDay)),
  });

  const currentMonthNumber = utils.getMonth(currentMonth);
  const selectedDates = (Array.isArray(date) ? date : [date])
    .filter(Boolean)
    .map(selectedDateItem => utils.startOfDay(selectedDateItem));

  console.log(utils.getWeekArray(currentMonth));
  return (
    <>
      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, i) => (
          <Typography
            aria-hidden
            key={day + i.toString()}
            variant="caption"
            className={classes.dayLabel}
            children={day.charAt(0).toUpperCase()}
          />
        ))}
      </div>

      <SlideTransition
        onExited={onMonthSwitchingAnimationEnd}
        reduceAnimations={reduceAnimations}
        slideDirection={slideDirection}
        transKey={currentMonthNumber}
        className={clsx(classes.transitionContainer, {
          [classes.transitionContainerOverflowAllowed]: allowOverflowingSlideTransition,
        })}
      >
        <div role="grid" style={{ overflow: 'hidden' }}>
          {utils.getWeekArray(currentMonth).map(week => (
            <div role="row" key={`week-${week[0]!.toString()}`} className={classes.week}>
              {week.map(day => {
                const disabled = isDateDisabled(day);
                const isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

                const dayProps = {
                  day: day,
                  isAnimating: isMonthSwitchingAnimating,
                  disabled: disabled,
                  allowKeyboardControl: allowKeyboardControl,
                  focused: Boolean(focusedDay) && utils.isSameDay(day, focusedDay),
                  onFocus: () => changeFocusedDay(day),
                  isToday: utils.isSameDay(day, now),
                  hidden: !isDayInCurrentMonth,
                  isInCurrentMonth: isDayInCurrentMonth,
                  selected: selectedDates.some(selectedDate => utils.isSameDay(selectedDate, day)),
                  disableHighlightToday,
                  showDaysOutsideCurrentMonth,
                  focusable:
                    Boolean(nowFocusedDay) &&
                    utils.toJsDate(nowFocusedDay).getDate() === utils.toJsDate(day).getDate(),
                };

                let dayComponent = renderDay ? (
                  renderDay(day, selectedDates, dayProps)
                ) : (
                  <Day {...dayProps} />
                );

                return (
                  <DayWrapper
                    key={day!.toString()}
                    value={day}
                    disabled={disabled}
                    onSelect={handleDaySelect}
                    children={dayComponent}
                    dayInCurrentMonth={isDayInCurrentMonth}
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
