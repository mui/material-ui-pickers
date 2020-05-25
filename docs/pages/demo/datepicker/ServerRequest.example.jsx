import * as React from 'react';
import { Badge } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { DatePicker, Day } from '@material-ui/pickers';
import { makeJSDateObject } from '../../../utils/helpers';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ServerRequest() {
  const savedRequestRef = React.useRef(null);
  const [selectedDays, setSelectedDays] = React.useState([1, 2, 15]);
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const handleMonthChange = () => {
    window.clearTimeout(savedRequestRef.current)
    setSelectedDays(null);

    // just select random days to simulate server side based data
    savedRequestRef.current = setTimeout(() => {
      setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
    }, 1000);
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
