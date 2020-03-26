import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DateRangePicker } from '@material-ui/pickers';

function CalendarsDateRangePicker() {
  /** @type import('@material-ui/pickers').DateRange */
  const initialValue = [null, null];
  const [selectedDate, handleDateChange] = useState(initialValue);

  return (
    <Grid container direction="column" alignItems="center">
      <Typography> 1 calendar </Typography>
      <DateRangePicker
        calendars={1}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
      <Typography> 2 calendars</Typography>
      <DateRangePicker
        calendars={2}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
      <Typography> 3 calendars</Typography>
      <DateRangePicker
        calendars={3}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Grid>
  );
}

export default CalendarsDateRangePicker;
