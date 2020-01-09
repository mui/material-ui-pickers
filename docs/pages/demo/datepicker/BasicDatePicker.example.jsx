import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';

function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <DatePicker
      label="Basic example"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
    />
  );
}

export default BasicDatePicker;
