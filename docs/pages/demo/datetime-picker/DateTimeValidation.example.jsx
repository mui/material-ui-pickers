import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

function DateTimePickerValidation() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <>
      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        label="Ignore date and time"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minDateTime={new Date()}
        onError={console.log}
      />

      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        label="Ignore time in each day"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minDate={new Date('2020-02-14')}
        minTime={new Date(0, 0, 0, 8)}
        maxTime={new Date(0, 0, 0, 18, 45)}
      />
    </>
  );
}

export default DateTimePickerValidation;
