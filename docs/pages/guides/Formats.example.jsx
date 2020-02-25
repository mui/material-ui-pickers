import format from 'date-fns/format';
import React, { useState } from 'react';
import frLocale from 'date-fns/locale/fr';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { DatePicker } from '@material-ui/pickers';
import { LocalizationProvider } from '@material-ui/pickers';

class LocalizedUtils extends DateFnsAdapter {
  getDatePickerHeaderText(date) {
    return format(date, 'd MMM yyyy', { locale: this.locale });
  }
}

function DateFnsLocalizationExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <LocalizationProvider adapter={LocalizedUtils} locale={frLocale}>
      <DatePicker
        clearable
        helperText="Localization done right"
        inputFormat="d MMM yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        clearLabel="vider"
        cancelLabel="annuler"
      />
    </LocalizationProvider>
  );
}

export default DateFnsLocalizationExample;
