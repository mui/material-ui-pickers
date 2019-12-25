import React, { Fragment, useState } from 'react';
import { DesktopDatePicker } from '@material-ui/pickers';

function InlineDatePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DesktopDatePicker
        label="Basic example"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DesktopDatePicker
        disableToolbar
        label="Only calendar"
        helperText="No year selection"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DesktopDatePicker
        autoOk
        inputVariant="outlined"
        label="With keyboard"
        format={props.__willBeReplacedGetFormatString({
          moment: 'MM/DD/YYYY',
          dateFns: 'MM/dd/yyyy',
        })}
        value={selectedDate}
        InputAdornmentProps={{ position: 'start' }}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default InlineDatePickerDemo;
