import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';

const StaticDatePicker = () => {
  const [date, changeDate] = useState(new Date());

  return (
    <>
      <DatePicker autoOk variant="static" value={date} onChange={changeDate} />
    </>
  );
};

export default StaticDatePicker;
