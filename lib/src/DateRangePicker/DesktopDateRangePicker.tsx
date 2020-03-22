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
  ...CalendarProps
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const { currentMonth } = CalendarProps;

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
              key={index}
              date={date}
              className={classes.calendar}
              {...CalendarProps}
              currentMonth={monthOnIteration}
              renderDay={(day, _, DayProps) => <DateRangeDay selectedRange={date} {...DayProps} />}
            />
          </div>
        );
      })}
    </div>
  );
};
