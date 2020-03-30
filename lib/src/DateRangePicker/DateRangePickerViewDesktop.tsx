import * as React from 'react';
import { DateRange } from './RangeTypes';
import { DateRangeDay } from './DateRangePickerDay';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '../typings/date';
import { calculateRangePreview } from './date-range-manager';
import { Calendar, CalendarProps } from '../views/Calendar/Calendar';
import { isWithinRange, isStartOfRange, isEndOfRange } from '../_helpers/date-utils';
import { ArrowSwitcher, ExportedArrowSwitcherProps } from '../_shared/ArrowSwitcher';
import {
  usePreviousMonthDisabled,
  useNextMonthDisabled,
} from '../_shared/hooks/date-helpers-hooks';

export interface ExportedDesktopDateRangeCalendarProps {
  calendars?: 1 | 2 | 3;
}

interface DesktopDateRangeCalendarProps
  extends ExportedDesktopDateRangeCalendarProps,
    CalendarProps,
    ExportedArrowSwitcherProps {
  date: DateRange;
  changeMonth: (date: MaterialUiPickersDate) => void;
  currentlySelectingRangeEnd: 'start' | 'end';
}

export const useStyles = makeStyles(
  theme => ({
    dateRangeContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    rangeCalendarContainer: {
      '&:not(:last-child)': {
        borderRight: `2px solid ${theme.palette.divider}`,
      },
    },
    calendar: {
      minWidth: 312,
      minHeight: 288,
    },
    arrowSwitcher: {
      padding: '16px 16px 8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }),
  { name: 'MuiPickersDesktopDateRangeCalendar' }
);

export const DateRangePickerViewDesktop: React.FC<DesktopDateRangeCalendarProps> = ({
  date,
  calendars = 2,
  changeMonth,
  leftArrowButtonProps,
  leftArrowButtonText,
  leftArrowIcon,
  rightArrowButtonProps,
  rightArrowButtonText,
  rightArrowIcon,
  onChange,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  currentlySelectingRangeEnd,
  ...CalendarProps
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const { currentMonth } = CalendarProps;
  const [rangePreviewDay, setRangePreviewDay] = React.useState<MaterialUiPickersDate>(null);

  const isNextMonthDisabled = useNextMonthDisabled(currentMonth, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, { disablePast, minDate });

  const previewingRange = calculateRangePreview({
    utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd,
  });

  const handleDayChange = React.useCallback(
    (day: MaterialUiPickersDate) => {
      setRangePreviewDay(null);
      onChange(day);
    },
    [onChange]
  );

  const handlePreviewDayChange = (newPreviewRequest: MaterialUiPickersDate) => {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  const CalendarTransitionProps = React.useMemo(
    () => ({
      onMouseLeave: () => setRangePreviewDay(null),
    }),
    []
  );

  const selectNextMonth = React.useCallback(() => {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  const selectPreviousMonth = React.useCallback(() => {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  return (
    <div className={classes.dateRangeContainer}>
      {new Array(calendars).fill(0).map((_, index) => {
        const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);

        return (
          <div key={index} className={classes.rangeCalendarContainer}>
            <ArrowSwitcher
              className={classes.arrowSwitcher}
              onLeftClick={selectPreviousMonth}
              onRightClick={selectNextMonth}
              isLeftHidden={index !== 0}
              isRightHidden={index !== calendars - 1}
              isLeftDisabled={isPreviousMonthDisabled}
              isRightDisabled={isNextMonthDisabled}
              leftArrowButtonProps={leftArrowButtonProps}
              leftArrowButtonText={leftArrowButtonText}
              leftArrowIcon={leftArrowIcon}
              rightArrowButtonProps={rightArrowButtonProps}
              rightArrowButtonText={rightArrowButtonText}
              rightArrowIcon={rightArrowIcon}
              text={utils.format(monthOnIteration, 'monthAndYear')}
            />

            <Calendar
              {...CalendarProps}
              key={index}
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              disablePast={disablePast}
              disableFuture={disableFuture}
              className={classes.calendar}
              onChange={handleDayChange}
              currentMonth={monthOnIteration}
              TransitionProps={CalendarTransitionProps}
              renderDay={(day, _, DayProps) => (
                <DateRangeDay
                  isPreviewing={isWithinRange(utils, day, previewingRange)}
                  isStartOfPreviewing={isStartOfRange(utils, day, previewingRange)}
                  isEndOfPreviewing={isEndOfRange(utils, day, previewingRange)}
                  isHighlighting={isWithinRange(utils, day, date)}
                  isStartOfHighlighting={isStartOfRange(utils, day, date)}
                  isEndOfHighlighting={isEndOfRange(utils, day, date)}
                  onMouseEnter={() => handlePreviewDayChange(day)}
                  {...DayProps}
                />
              )}
            />
          </div>
        );
      })}
    </div>
  );
};
