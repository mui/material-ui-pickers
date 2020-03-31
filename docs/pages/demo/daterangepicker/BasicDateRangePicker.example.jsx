import React, { useState } from 'react';
import { DateRangePicker } from '@material-ui/pickers';

function BasicDateRangePicker() {
  /** @type import('@material-ui/pickers').DateRange */
  const initialValue = [null, null];
  const [selectedDate, handleDateChange] = useState(initialValue);

  return <DateRangePicker value={selectedDate} onChange={date => handleDateChange(date)} />;
}

export default BasicDateRangePicker;
