import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core';
import { useUtils } from '../_shared/hooks/useUtils';
import { DAY_MARGIN } from '../constants/dimensions';
import { Day, DayProps } from '../views/Calendar/Day';
import { MaterialUiPickersDate } from '../typings/date';

interface DateRangeDayProps extends DayProps {
  isHighlighting: boolean;
  isEndOfHighlighting: boolean;
  isStartOfHighlighting: boolean;
  isPreviewing: boolean;
  isEndOfPreviewing: boolean;
  isStartOfPreviewing: boolean;
  rangePreviewDay: MaterialUiPickersDate;
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
    day: {
      // Required to overlap preview border
      transform: 'scale(1.1)',
      '&:hover': {
        border: `2px solid ${theme.palette.grey[500]}`,
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

export const DateRangeDay: React.FC<DateRangeDayProps> = React.memo(
  ({
    day,
    className,
    selected,
    isPreviewing,
    isStartOfPreviewing,
    isEndOfPreviewing,
    isHighlighting,
    isEndOfHighlighting,
    isStartOfHighlighting,
    ...other
  }) => {
    const classes = useStyles();

    return (
      <div
        className={clsx(classes.rangeIntervalDay, {
          [classes.rangeIntervalDayHighlight]: isHighlighting,
          [classes.rangeIntervalDayHighlightStart]: isStartOfHighlighting,
          [classes.rangeIntervalDayHighlightEnd]: isEndOfHighlighting,
        })}
      >
        <div
          className={clsx(classes.rangeIntervalPreview, {
            [classes.rangeIntervalDayPreviewStart]: isStartOfPreviewing,
            [classes.rangeIntervalDayPreviewEnd]: isEndOfPreviewing,
            [classes.rangeIntervalDayPreview]: isPreviewing,
          })}
        >
          <Day
            {...other}
            day={day}
            selected={selected}
            disableMargin
            showDaysOutsideCurrentMonth
            className={clsx(
              classes.day,
              {
                [classes.notSelectedDate]: !selected,
                [classes.dayInsideRangeInterval]: !selected && isHighlighting,
              },
              className
            )}
          />
        </div>
      </div>
    );
  }
);
