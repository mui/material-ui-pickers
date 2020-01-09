import React, { useState } from 'react';
import { MobileDateTimePicker, DesktopDateTimePicker, DateTimePicker } from '@material-ui/pickers';

function DateTimePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <>
      <MobileDateTimePicker
        autoOk
        ampm={false}
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
        label="24h clock"
      />

      <DesktopDateTimePicker
        value={selectedDate}
        disablePast
        onChange={handleDateChange}
        label="With Today Button"
        showTodayButton
      />

      <DateTimePicker
        ampm={false}
        label="With keyboard"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD HH:mm',
          dateFns: 'yyyy/MM/dd HH:mm',
        })}
      />
    </>
  );
}

export default DateTimePickerDemo;
