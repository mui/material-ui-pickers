import React, { Fragment, useState } from 'react';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { TextField } from '@material-ui/core';
import { DesktopDatePicker } from '@material-ui/pickers';

function AdvancedKeyboardExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DesktopDatePicker
        autoOk
        variant="outlined"
        label="Advanced keyboard"
        placeholder="2018/01/01"
        inputFormat={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD',
          dateFns: 'yyyy/MM/dd',
        })}
        mask="____/__/__"
        keyboardIcon={<EventNoteIcon />}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />
    </Fragment>
  );
}

export default AdvancedKeyboardExample;
