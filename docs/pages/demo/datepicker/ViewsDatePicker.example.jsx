import React, { Fragment, useState } from 'react';
import { TextField } from '@material-ui/core';
import { DatePicker, MobileDatePicker } from '@material-ui/pickers';

function YearMonthPicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DatePicker
        views={['year']}
        label="Year only"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />

      <MobileDatePicker
        views={['year', 'month']}
        label="Year and Month"
        helperText="With min and max"
        minDate={new Date('2012-03-01')}
        maxDate={new Date('2023-06-01')}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />

      <DatePicker
        openTo="year"
        views={['year', 'month']}
        label="Year and Month"
        helperText="Start from year selection"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />
    </Fragment>
  );
}

export default YearMonthPicker;
