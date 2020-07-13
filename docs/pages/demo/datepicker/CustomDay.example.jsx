import clsx from 'clsx';
import React, { useState } from 'react';
import isSameDay from 'date-fns/isSameDay';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import TextField from '@material-ui/core/TextField';
import isWithinInterval from 'date-fns/isWithinInterval';
import { makeStyles } from '@material-ui/core';
// this guy required only on the docs site to work with dynamic date library
import { makeJSDateObject } from '../../../utils/helpers';
import { DatePicker, PickersDay } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  highlight: {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  firstHighlight: {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
}));

function WeekPicker(props) {
  const classes = useStyles(props);
  const [selectedDate, handleDateChange] = useState(new Date());

  const renderWeekPickerDay = (date, selectedDates, DayComponentProps) => {
    let dateClone = makeJSDateObject(date);
    let selectedDateClone = makeJSDateObject(selectedDate);

    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    return (
      <PickersDay
        {...DayComponentProps}
        disableMargin
        className={clsx({
          [classes.highlight]: dayIsBetween,
          [classes.firstHighlight]: isFirstDay,
          [classes.endHighlight]: isLastDay,
        })}
      />
    );
  };

  return (
    <DatePicker
      showDaysOutsideCurrentMonth
      label="Week picker"
      value={selectedDate}
      onChange={handleDateChange}
      renderDay={renderWeekPickerDay}
      renderInput={props => <TextField {...props} />}
      inputFormat={props.__willBeReplacedGetFormatString({
        moment: `[Week of] MMM D`,
        dateFns: "'Week of' MMM d",
      })}
    />
  );
}

export default WeekPicker;
