import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <DatePicker
      label="Basic example"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
      onError={console.log}
      renderInput={props => <TextField {...props} />}
    />
  );
}

export default BasicDatePicker;
