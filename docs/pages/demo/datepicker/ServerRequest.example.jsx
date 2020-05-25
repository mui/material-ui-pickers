import * as React from 'react';
import { Badge } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { DatePicker, Day } from '@material-ui/pickers';
import { makeJSDateObject } from '../../../utils/helpers';

function ServerRequest() {
  const requestAbortController = React.useRef(null);
  const [selectedDays, setSelectedDays] = React.useState([1, 2, 15]);
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const handleMonthChange = date => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setSelectedDays(null)

    const controller = new AbortController();
    fetch(`/fakeApi/randomDate?month=${date.toString()}`, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(({ daysToHighlight }) => {
        setSelectedDays(daysToHighlight);
      })
      .catch(() => console.log("Ooopsy, something went wrong"))

    requestAbortController.current = controller;
  };

  return (
    <>
      <DatePicker
        value={selectedDate}
        loading={selectedDays === null}
        onChange={date => handleDateChange(date)}
        onMonthChange={handleMonthChange}
        renderInput={props => <TextField {...props} />}
        renderDay={(day, selectedDate, DayComponentProps) => {
          const date = makeJSDateObject(day); // skip this step, it is required to support date libs
          const isSelected =
            DayComponentProps.inCurrentMonth && selectedDays.includes(date.getDate());

          return (
            <Badge overlap="circle" badgeContent={isSelected ? '🌚' : undefined}>
              <Day {...DayComponentProps} />
            </Badge>
          );
        }}
      />
    </>
  );
}

export default ServerRequest;
