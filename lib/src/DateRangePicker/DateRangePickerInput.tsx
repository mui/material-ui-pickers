import * as React from 'react';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import { TextField } from '@material-ui/core';
import { DateInputProps } from '../_shared/PureDateInput';
import { RangeInput, DateRange } from './DateRangePicker';

export const DateRangePickerInput: React.FC<DateInputProps<RangeInput, DateRange>> = ({
  rawValue,
  onChange,
  ...other
}) => {
  console.log(rawValue);
  const [start, end] = rawValue;
  return (
    <>
      <KeyboardDateInput rawValue={start} {...other} />
      <KeyboardDateInput rawValue={end} {...other} />
    </>
  );
};
