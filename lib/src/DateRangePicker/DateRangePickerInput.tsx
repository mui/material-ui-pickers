import * as React from 'react';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import { RangeInput, DateRange } from './RangeTypes';
import { MaterialUiPickersDate } from '../typings/date';
import { DateInputProps } from '../_shared/PureDateInput';
import { makeStyles, Typography } from '@material-ui/core';

export const useStyles = makeStyles(
  _ => ({
    rangeInputsContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    toLabelDelimiter: {
      margin: '0 16px',
    },
  }),
  { name: 'MuiPickersDateRangePickerInput' }
);

export interface DateRangePickerInputSpecificProps {
  toText?: React.ReactNode;
}

// prettier-ignore
export const DateRangePickerInput: React.FC<
  DateRangePickerInputSpecificProps &
  DateInputProps<RangeInput, DateRange>
> = ({
  toText = 'to',
  rawValue,
  onChange,
  onClick,
  parsedDateValue,
  ...other
}) => {
  const classes = useStyles();
  const [start, end] = parsedDateValue ?? [null, null];
  const handleStartChange = (date: MaterialUiPickersDate, inputString?: string) => {
    onChange([date, end], inputString);
  };

  const handleEndChange = (date: MaterialUiPickersDate, inputString?: string) => {
    onChange([start, date], inputString);
  };

  const sharedInputProps =  {
    onFocus: other.openPicker,
    // onClick: other.openPicker,
    // onFocus: other.openPicker
  }

  return (
    <div className={classes.rangeInputsContainer}>
      <KeyboardDateInput
        {...other}
        rawValue={start}
        parsedDateValue={start}
        onChange={handleStartChange}
        hideOpenPickerButton
        {...sharedInputProps}
      />

      <Typography className={classes.toLabelDelimiter}>{toText}</Typography>

      <KeyboardDateInput
        {...other}
        rawValue={end}
        parsedDateValue={end}
        onChange={handleEndChange}
        hideOpenPickerButton
        {...sharedInputProps}
      />
    </div>
  );
};
