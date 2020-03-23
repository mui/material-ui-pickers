import * as React from 'react';
import { DateRange } from './RangeTypes';
import { DateRangeDay } from './DateRangeDay';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { makeStyles, Typography } from '@material-ui/core';
import { Calendar, CalendarProps } from '../views/Calendar/Calendar';
import { ArrowSwitcher, ExportedArrowSwitcherProps } from '../_shared/ArrowSwitcher';

export interface ExportedDesktopDateRangeCalendarProps {
  calendars?: 1 | 2;
}

interface DesktopDateRangeCalendarProps
  extends ExportedDesktopDateRangeCalendarProps,
    CalendarProps,
    ExportedArrowSwitcherProps {
  date: DateRange;
  changeMonth: (date: MaterialUiPickersDate) => void;
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

export const DesktopDateRangeCalendar: React.FC<DesktopDateRangeCalendarProps> = ({
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
  ...CalendarProps
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const { currentMonth } = CalendarProps;
  const [start, end] = date;
  const [rangePreviewDay, setRangePreviewDay] = React.useState<MaterialUiPickersDate>(
    new Date('2020-04-24T14:34:19.027Z')
  );

  const previewingRange: DateRange | null = Boolean(rangePreviewDay)
    ? utils.isAfter(start, rangePreviewDay)
      ? [rangePreviewDay, start]
      : [end, rangePreviewDay]
    : null;

  const handleDayChange = (day: MaterialUiPickersDate) => {
    setRangePreviewDay(null);
    onChange(day);
  };

  const handlePreviewDayChange = (newPreviewRequest: MaterialUiPickersDate) => {
    if (!utils.isWithinRange(newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    }
  };

  const isWithinRange = (day: MaterialUiPickersDate, range: DateRange | null) => {
    return Boolean(range && utils.isBefore(range[0], range[1]) && utils.isWithinRange(day, range));
  };

  const isStartOfRange = (day: MaterialUiPickersDate, range: DateRange | null) => {
    return Boolean(range && utils.isSameDay(day, range[0]));
  };

  const isEndOfRange = (day: MaterialUiPickersDate, range: DateRange | null) => {
    return Boolean(range && utils.isSameDay(day, range[1]));
  };

  const CalendarTransitionProps = React.useMemo(
    () => ({
      onMouseLeave: () => setRangePreviewDay(null),
    }),
    []
  );

  return (
    <div className={classes.dateRangeContainer}>
      {new Array(calendars).fill(0).map((_, index) => {
        const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);

        return (
          <div className={classes.rangeCalendarContainer}>
            <ArrowSwitcher
              className={classes.arrowSwitcher}
              onLeftClick={() => changeMonth(utils.getPreviousMonth(currentMonth))}
              onRightClick={() => changeMonth(utils.getNextMonth(currentMonth))}
              isLeftHidden={index !== 0}
              isRightHidden={index !== calendars - 1}
              isLeftDisabled={false}
              isRightDisabled={false}
              leftArrowButtonProps={leftArrowButtonProps}
              leftArrowButtonText={leftArrowButtonText}
              leftArrowIcon={leftArrowIcon}
              rightArrowButtonProps={rightArrowButtonProps}
              rightArrowButtonText={rightArrowButtonText}
              rightArrowIcon={rightArrowIcon}
            >
              <Typography display="inline" variant="subtitle1">
                {utils.format(monthOnIteration, 'monthAndYear')}
              </Typography>
            </ArrowSwitcher>

            <Calendar
              {...CalendarProps}
              key={index}
              date={date}
              className={classes.calendar}
              onChange={handleDayChange}
              currentMonth={monthOnIteration}
              TransitionProps={CalendarTransitionProps}
              renderDay={(day, _, DayProps) => (
                <DateRangeDay
                  isPreviewing={isWithinRange(day, previewingRange)}
                  isStartOfPreviewing={isStartOfRange(day, previewingRange)}
                  isEndOfPreviewing={isEndOfRange(day, previewingRange)}
                  isHighlighting={isWithinRange(day, date)}
                  isStartOfHighlighting={isStartOfRange(day, date)}
                  isEndOfHighlighting={isEndOfRange(day, date)}
                  onMouseOver={() => handlePreviewDayChange(day)}
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
