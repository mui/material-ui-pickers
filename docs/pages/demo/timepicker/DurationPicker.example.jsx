import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { TimePicker } from '@material-ui/pickers';
import fromUnixTime from 'date-fns/fromUnixTime';
import setYear from 'date-fns/setYear';
import setMonth from 'date-fns/setMonth';
import setDate from 'date-fns/setDate';

function DurationPicker() {
  const [selectedDuration, handleDurationChange] = useState(1000 * 60 * 10.5);
  console.log(selectedDuration)
  return (
    <Fragment>
      <TimePicker
        autoOk={false}
        ampm={false}
        openTo="hours"
        views={['hours', 'minutes', 'seconds']}
        inputFormat="HH:mm:ss"
        renderInput={(timeProps) => <TextField {...timeProps} />}
        value={fromUnixTime(selectedDuration / 1000 + new Date().getTimezoneOffset() * 60)}
        onChange={(date) => {
          const timeWithoutDate = setDate(setMonth(setYear(date, 1970), 0), 1);
          const utcTime =
            (timeWithoutDate.getTime() / 1000 - new Date().getTimezoneOffset() * 60) * 1000;
          handleDurationChange(utcTime);
        }}
      />
    </Fragment>
  );
}

export default DurationPicker;
