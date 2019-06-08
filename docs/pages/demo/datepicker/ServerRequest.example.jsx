import React, { Fragment, useState } from 'react';
import { Badge } from '@material-ui/core';
import { makeJSDateObject } from '../../../utils/helpers';
import { DatePicker, Day, useUtils } from '@material-ui/pickers';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ServerRequest() {
  const utils = useUtils();
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMonthChange = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
        resolve();
      }, 1000);
    });
  };

  return (
    <Fragment>
      <DatePicker
        label="Server"
        value={selectedDate}
        onChange={handleDateChange}
        onMonthChange={handleMonthChange}
        renderDay={(day, selected, isInCurrentMonth) => {
          const date = makeJSDateObject(day); // skip this step, it is required to support date libs
          const isSelected = isInCurrentMonth && selectedDays.includes(date.getDate());

          return (
            <Badge badgeContent={isSelected ? '🌚' : undefined}>
              <Day selected={utils.isSameDay(day, selected)} hidden={!isInCurrentMonth}>
                {utils.getDayText(day)}
              </Day>
            </Badge>
          );
        }}
      />
    </Fragment>
  );
}

export default ServerRequest;
