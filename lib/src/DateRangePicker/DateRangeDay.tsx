import * as React from 'react';
import WAclsx from 'clsx';
import { DateRange } from './RangeTypes';
import { makeStyles } from '@material-ui/core';
import { useUtils } from '../_shared/hooks/useUtils';
import { Day, DayProps } from '../views/Calendar/Day';

interface DateRangeDayProps extends DayProps {
  selectedRange: DateRange;
}

const useStyles = makeStyles(
  theme => ({
    rangeIntervalHighlighted: {
      borderRadius: 0,
      color: theme.palette.primary,
      backgroundColor: theme.palette.primary.light,
    },
  }),
  { name: 'MuiPickersDateRangeDay' }
);

export const DateRangeDay: React.FC<DateRangeDayProps> = ({
  selectedRange,
  className,
  ...other
}) => {
  const utils = useUtils();
  const classes = useStyles(0);

  return (
    <Day
      {...other}
      disableMargin
      showDaysOutsideCurrentMonth
      className={clsx(
        {
          [classes.rangeIntervalHighlighted]: utils.isWithinRange(other.day, selectedRange),
        },
        className
      )}
    />
  );
};
