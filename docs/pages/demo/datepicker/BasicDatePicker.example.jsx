import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';

function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <DatePicker
      label="Basic example"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
      minDate={new Date('2000-01-01')}
      maxDate={new Date('2010-01-01')}
      renderInput={props => <TextField {...props} />}
    />
  );
}

export default BasicDatePicker;
