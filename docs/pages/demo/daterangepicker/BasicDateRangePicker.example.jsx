import React, { useState } from 'react';
import { MobileDateRangePicker } from '@material-ui/pickers';

function BasicDateRangePicker() {
  const [selectedDate, handleDateChange] = useState([new Date(), null]);

  return <MobileDateRangePicker value={selectedDate} onChange={date => handleDateChange(date)} />;
}

export default BasicDateRangePicker;
