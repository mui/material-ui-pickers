import React, { useState } from 'react';
import { DatePicker as StaticDatePicker } from '@material-ui/pickers';

const StaticDatePickerExample = () => {
  const [date, handleDateChange] = useState(new Date());

  return (
    <>
      <StaticDatePicker
        autoOk
        openTo="year"
        value={date}
        onChange={date => handleDateChange(date)}
      />

      <StaticDatePicker
        autoOk
        orientation="landscape"
        openTo="date"
        value={date}
        onChange={date => handleDateChange(date)}
      />
    </>
  );
};

export default StaticDatePickerExample;
