import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core';
import { DAY_MARGIN } from '../constants/dimensions';
import { useUtils } from '../_shared/hooks/useUtils';
import { Day, DayProps, areDayPropsEqual } from '../views/Calendar/Day';

interface DateRangeDayProps extends DayProps {
  isHighlighting: boolean;
  isEndOfHighlighting: boolean;
  isStartOfHighlighting: boolean;
  isPreviewing: boolean;
  isEndOfPreviewing: boolean;
  isStartOfPreviewing: boolean;
}

const endBorderStyle = {
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%',
};

const startBorderStyle = {
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%',
};

const useStyles = makeStyles(
  theme => ({
    rangeIntervalDay: {
      padding: `0 ${DAY_MARGIN}px`,
      '&:first-child $rangeIntervalDayPreview': startBorderStyle,
      '&:last-child $rangeIntervalDayPreview': endBorderStyle,
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
    day: {
      // Required to overlap preview border
      transform: 'scale(1.1)',
      '& > *': {
        transform: 'scale(0.9)',
      },
    },
    dayOutsideRangeInterval: {
      '&:hover': {
        border: `1px solid ${theme.palette.grey[500]}`,
      },
    },
    dayInsideRangeInterval: {
      color: theme.palette.getContrastText(fade(theme.palette.primary.light, 0.6)),
    },
    notSelectedDate: {
      backgroundColor: 'transparent',
    },
    rangeIntervalPreview: {
      borderTop: '2px solid transparent',
      borderBottom: '2px solid transparent',
    },
    rangeIntervalDayPreview: {
      borderRadius: 0,
      borderTop: `2px dashed ${theme.palette.divider}`,
      borderBottom: `2px dashed ${theme.palette.divider}`,
    },
    rangeIntervalDayPreviewStart: {
      ...startBorderStyle,
    },
    rangeIntervalDayPreviewEnd: {
      ...endBorderStyle,
    },
  }),
  { name: 'MuiPickersDateRangeDay' }
);

export const PureDateRangeDay = ({
  day,
  className,
  selected,
  isPreviewing,
  isStartOfPreviewing,
  isEndOfPreviewing,
  isHighlighting,
  isEndOfHighlighting,
  isStartOfHighlighting,
  inCurrentMonth,
  ...other
}: DateRangeDayProps) => {
  const utils = useUtils();
  const classes = useStyles();

  const isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  const isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));

  return (
    <div
      className={clsx(classes.rangeIntervalDay, {
        [classes.rangeIntervalDayHighlight]: isHighlighting && inCurrentMonth,
        [classes.rangeIntervalDayHighlightEnd]: isEndOfHighlighting || isEndOfMonth,
        [classes.rangeIntervalDayHighlightStart]: isStartOfHighlighting || isStartOfMonth,
      })}
    >
      <div
        className={clsx(classes.rangeIntervalPreview, {
          [classes.rangeIntervalDayPreview]: isPreviewing && inCurrentMonth,
          [classes.rangeIntervalDayPreviewEnd]: isEndOfPreviewing || isEndOfMonth,
          [classes.rangeIntervalDayPreviewStart]: isStartOfPreviewing || isStartOfMonth,
        })}
      >
        <Day
          disableMargin
          {...other}
          day={day}
          selected={selected}
          inCurrentMonth={inCurrentMonth}
          className={clsx(
            classes.day,
            {
              [classes.notSelectedDate]: !selected,
              [classes.dayOutsideRangeInterval]: !isHighlighting,
              [classes.dayInsideRangeInterval]: !selected && isHighlighting,
            },
            className
          )}
        />
      </div>
    </div>
  );
};

PureDateRangeDay.displayName = 'DateRangeDay';

export const DateRangeDay = React.memo(PureDateRangeDay, (prevProps, nextProps) => {
  return (
    prevProps.isHighlighting === nextProps.isHighlighting &&
    prevProps.isEndOfHighlighting === nextProps.isEndOfHighlighting &&
    prevProps.isStartOfHighlighting === nextProps.isStartOfHighlighting &&
    prevProps.isPreviewing === nextProps.isPreviewing &&
    prevProps.isEndOfPreviewing === nextProps.isEndOfPreviewing &&
    prevProps.isStartOfPreviewing === nextProps.isStartOfPreviewing &&
    areDayPropsEqual(prevProps, nextProps)
  );
});
