import * as React from 'react';
import clsx from 'clsx';
import { DateRange } from './RangeTypes';
import { makeStyles, fade } from '@material-ui/core';
import { useUtils } from '../_shared/hooks/useUtils';
import { DAY_MARGIN } from '../constants/dimensions';
import { Day, DayProps } from '../views/Calendar/Day';

interface DateRangeDayProps extends DayProps {
  selectedRange: DateRange;
}

const endBorderStyle = {
  borderTopRightRadius: '60%',
  borderBottomRightRadius: '60%',
};

const startBorderStyle = {
  borderTopLeftRadius: '60%',
  borderBottomLeftRadius: '60%',
};

const useStyles = makeStyles(
  theme => ({
    rangeIntervalDay: {
      padding: `0 ${DAY_MARGIN}px`,
    },
    rangeIntervalDayHighlight: {
      borderRadius: 0,
      color: theme.palette.primary.contrastText,
      backgroundColor: fade(theme.palette.primary.light, 0.6),
      '&:first-child': startBorderStyle,
      '&:last-child': endBorderStyle,
    },
    rangeIntervalDayHighlightStart: {
      ...startBorderStyle,
      paddingLeft: 0,
      marginLeft: DAY_MARGIN / 2,
    },
    rangeIntervalDayHighlightEnd: {
      ...endBorderStyle,
      paddingRight: 0,
      marginRight: DAY_MARGIN / 2,
    },
    dayInsideRangeInterval: {
      backgroundColor: 'transparent',
      color: theme.palette.getContrastText(fade(theme.palette.primary.light, 0.6)),
    },
    rangeIntervalStart: {},
  }),
  { name: 'MuiPickersDateRangeDay' }
);

export const DateRangeDay: React.FC<DateRangeDayProps> = ({
  day,
  selectedRange,
  className,
  selected,
  ...other
}) => {
  const utils = useUtils();
  const classes = useStyles(0);
  const [start, end] = selectedRange;

  return (
    <div
      className={clsx(classes.rangeIntervalDay, {
        [classes.rangeIntervalDayHighlight]: utils.isWithinRange(day, selectedRange),
        [classes.rangeIntervalDayHighlightStart]: utils.isSameDay(day, start),
        [classes.rangeIntervalDayHighlightEnd]: utils.isSameDay(day, end),
      })}
    >
      <Day
        {...other}
        day={day}
        selected={selected}
        disableMargin
        showDaysOutsideCurrentMonth
        className={clsx(
          {
            [classes.dayInsideRangeInterval]: !selected && utils.isWithinRange(day, selectedRange),
          },
          className
        )}
      />
    </div>
  );
};
