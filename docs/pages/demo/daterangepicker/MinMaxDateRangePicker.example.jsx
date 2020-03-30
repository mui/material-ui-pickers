import React, { useState } from 'react';
import isWeekend from 'date-fns/isWeekend';
// this guy required only on the docs site to work with dynamic date library
import { makeJSDateObject } from '../../../utils/helpers';
import { DateRangePicker, useUtils } from '@material-ui/pickers';

function disableWeekends(date) {
  // TODO: replace with implementation for your date library
  return isWeekend(makeJSDateObject(date));
}

function MinMaxDateRangePicker() {
  const utils = useUtils();
  const [selectedRange, handleDateChange] = useState([new Date(), null]);

  return (
    <DateRangePicker
      disablePast
      value={selectedRange}
      shouldDisableDate={disableWeekends}
      maxDate={utils.addMonths(utils.date(selectedRange[0]), 12)}
      onChange={date => handleDateChange(date)}
    />
  );
}

export default MinMaxDateRangePicker;
