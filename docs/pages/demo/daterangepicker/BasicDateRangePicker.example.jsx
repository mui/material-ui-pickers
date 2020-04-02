import React, { useState } from 'react';
import { DateRangePicker } from '@material-ui/pickers';

function BasicDateRangePicker() {
  /** @type import('@material-ui/pickers').DateRange */
  const initialValue = [null, null];
  const [selectedDate, handleDateChange] = useState(initialValue);

  // prettier-ignore
  return (
    <DateRangePicker
      value={selectedDate}
      onChange={date => handleDateChange(date)}
      value={[new Date('2018-01-01T00:00:00.000Z'), new Date('2018-01-31T00:00:00.000Z')]}
    />
  );
}

export default BasicDateRangePicker;
