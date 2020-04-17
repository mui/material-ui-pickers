import React, { useState } from 'react';
import frLocale from 'date-fns/locale/fr';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LocalizationProvider } from '@material-ui/pickers';
const formats = {
  normalDate: 'd MMM yyy',
  keyboardDate: 'd MMM yyy',
};

function DateFnsLocalizationExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={frLocale} dateFormats={formats}>
      <DatePicker
        renderInput={props => <TextField {...props} />}
        clearable
        helperText="Localization done right"
        value={selectedDate}
        onChange={handleDateChange}
        clearLabel="vider"
        cancelLabel="annuler"
      />
    </LocalizationProvider>
  );
}

export default DateFnsLocalizationExample;
