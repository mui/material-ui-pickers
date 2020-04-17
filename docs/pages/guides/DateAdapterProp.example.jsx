import React, { useState } from 'react';
import ruLocale from 'date-fns/locale/ru';
import deLocale from 'date-fns/locale/de';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
const staticDateAdapter = new DateFnsAdapter({ locale: ruLocale });

function UsingDateAdapterProp() {
  const [locale] = useState(deLocale);
  const [selectedDate, handleDateChange] = useState(new Date());
  const memoizedDateAdapter = useMemo(() => {
    return new DateFnsAdapter({ locale });
  }, [locale]);

  return (
    <>
      <DatePicker
        renderInput={props => <TextField {...props} />}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        dateAdapter={staticDateAdapter}
      />

      <DatePicker
        renderInput={props => <TextField {...props} />}
        helperText="In case you need to generate adapter from state"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        dateAdapter={memoizedDateAdapter}
      />
    </>
  );
}

export default UsingDateAdapterProp;
