import React, { Fragment, useState } from 'react';
import { DateTimePicker, TimePickerView, useUtils } from '@material-ui/pickers';
import { Button } from '@material-ui/core';

const CustomTimePickerView = props => {
  const utils = useUtils();
  return (
    <div style={{ position: 'relative' }}>
      <TimePickerView {...props} />
      <Button
        style={{ position: 'absolute', zIndex: 10, top: 0 }}
        onClick={() => {
          props.onHourChange(utils.mergeDateAndTime(props.date, new Date('2018-01-01 13:37')));
        }}
      >
        {' '}
        13:37{' '}
      </Button>
    </div>
  );
};

function CustomizeViewExample() {
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  return (
    <Fragment>
      <DateTimePicker
        ampm={false}
        viewComponents={{ hours: CustomTimePickerView }}
        value={selectedDate}
        onChange={handleDateChange}
        label="Custom TimePickerView"
      />
    </Fragment>
  );
}

export default CustomizeViewExample;
