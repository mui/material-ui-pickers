import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(null);

  return (
    <DatePicker
      open
      label="Basic example"
      value={selectedDate}
      views={['year']}
      minDate={new Date("2000-01-01")}
      maxDate={new Date("2010-01-01")}
      onChange={date => handleDateChange(date)}
      renderInput={props => <TextField {...props} />}
    />
  );
}

export default BasicDatePicker;
