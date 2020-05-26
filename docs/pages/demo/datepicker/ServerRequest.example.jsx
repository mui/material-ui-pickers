import * as React from 'react';
import { Badge } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { DatePicker, Day } from '@material-ui/pickers';
import { makeJSDateObject } from '../../../utils/helpers';

function ServerRequest() {
  const requestAbortController = React.useRef(null);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [selectedDate, handleDateChange] = React.useState(new Date());

  React.useEffect(() => {
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = date => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setHighlightedDays(null);

    const controller = new AbortController();
    fetch(`/fakeApi/randomDate?month=${date.toString()}`, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(({ daysToHighlight }) => setHighlightedDays(daysToHighlight))
      .catch(() => console.log('Ooopsy, something went wrong'));

    requestAbortController.current = controller;
  };

  return (
    <>
      <DatePicker
        value={selectedDate}
        loading={highlightedDays === null}
        onChange={date => handleDateChange(date)}
        onMonthChange={handleMonthChange}
        renderInput={props => <TextField {...props} />}
        renderDay={(day, selectedDate, DayComponentProps) => {
          const date = makeJSDateObject(day); // skip this step, it is required to support date libs
          const isSelected =
            DayComponentProps.inCurrentMonth && highlightedDays.includes(date.getDate());

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
