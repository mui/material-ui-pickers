import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { ArrowSwitcher } from '../_shared/ArrowSwitcher';
import { Calendar, CalendarProps } from '../views/Calendar/Calendar';

export interface ExportedDesktopDateRangeCalendarProps {
  calendars?: 1 | 2;
}

interface DesktopDateRangeCalendarProps
  extends ExportedDesktopDateRangeCalendarProps,
    CalendarProps {
  changeMonth: (date: MaterialUiPickersDate) => void;
}

export const useStyles = makeStyles(
  theme => ({
    dateRangeContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0 16px 8px 0',
    },
    calendar: {
      padding: '0 16px',
    },
  }),
  { name: 'MuiPickersDesktopDateRangeCalendar' }
);

export const DesktopDateRangeCalendar: React.FC<DesktopDateRangeCalendarProps> = ({
  calendars = 2,
  changeMonth,
  ...CalendarProps
}) => {
  const utils = useUtils();
  const classes = useStyles();

  return (
    <div className={classes.dateRangeContainer}>
      {new Array(calendars).fill(0).map((_, index) => {
        const monthOnIteration = utils.setMonth(
          CalendarProps.currentMonth,
          utils.getMonth(CalendarProps.currentMonth) + index
        );

        console.log(monthOnIteration);

        return (
          <div>
            <ArrowSwitcher
              onLeftClick={() => changeMonth(utils.getPreviousMonth(CalendarProps.currentMonth))}
              onRightClick={() => changeMonth(utils.getNextMonth(CalendarProps.currentMonth))}
            />

            <Calendar
              key={index}
              allowOverflowingSlideTransition
              className={classes.calendar}
              {...CalendarProps}
              currentMonth={monthOnIteration}
            />
          </div>
        );
      })}
    </div>
  );
};
