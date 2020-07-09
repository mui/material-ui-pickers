/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import moment, { Moment } from 'moment';
import LuxonAdapter from '@material-ui/pickers/adapter/luxon';
import { DateTime } from 'luxon';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

// Allows to set date type right with generic JSX syntax
<DatePicker<Date>
  value={new Date()}
  onChange={date => date?.getDate()}
  renderInput={props => <TextField {...props} />}
/>;

// Inference from the state
const InferTest = () => {
  const [date, setDate] = React.useState<DateTime | null>(new DateTime());

  return (
    <DatePicker
      value={date}
      onChange={date => setDate(date)}
      renderInput={props => <TextField {...props} />}
    />
  );
};

// Infer value type from the dateAdapter
<DatePicker
  value={new DateTime()}
  onChange={date => console.log(date)}
  renderInput={props => <TextField {...props} />}
  dateAdapter={new LuxonAdapter()}
/>;

// Conflict between value type and date adapter causes error
<DatePicker
  value={moment()}
  onChange={date => console.log(date)}
  renderInput={props => <TextField {...props} />}
  // @ts-expect-error
  dateAdapter={new LuxonAdapter()}
/>;

// Conflict between explicit generic type and date adapter causes error
<DatePicker<Moment>
  value={moment()}
  onChange={date => console.log(date)}
  renderInput={props => <TextField {...props} />}
  // @ts-expect-error
  dateAdapter={new LuxonAdapter()}
/>;
