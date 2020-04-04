import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import { Dayjs } from 'dayjs';
import { Moment } from 'moment';
import { DateTime } from 'luxon';
import { addYears } from 'date-fns';
// this guy required only on the docs site to work with dynamic date library
import { makeJSDateObject } from '../../../utils/helpers';
import { DateRangePicker, DateRange } from '@material-ui/pickers';

function disableWeekends(date: Moment | DateTime | Dayjs | Date) {
  // TODO: replace with implementation for your date library
  return isWeekend(makeJSDateObject(date));
}

function getOneYearAfter(date: Moment | DateTime | Dayjs | Date) {
  // TODO: replace with implementation for your date library
  return addYears(makeJSDateObject(date), 1);
}

function MinMaxDateRangePicker() {
  const [selectedRange, handleDateChange] = React.useState<DateRange>([new Date(), null]);

  return (
    <DateRangePicker
      disablePast
      value={selectedRange}
      shouldDisableDate={disableWeekends}
      maxDate={getOneYearAfter(selectedRange[0])}
      onChange={date => handleDateChange(date)}
    />
  );
}

export default MinMaxDateRangePicker;
