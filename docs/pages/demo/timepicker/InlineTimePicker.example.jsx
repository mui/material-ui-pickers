import React, { Fragment, useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

function InlineTimePickerDemo() {
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  return (
    <Fragment>
      <TimePicker
        label="Inline mode"
        ampmInClock
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <TimePicker
        ampm={false}
        label="With keyboard"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default InlineTimePickerDemo;
