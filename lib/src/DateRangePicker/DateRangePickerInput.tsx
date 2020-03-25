import * as React from 'react';
import clsx from 'clsx';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import { RangeInput, DateRange } from './RangeTypes';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { DateInputProps } from '../_shared/PureDateInput';
import { makeStyles, Typography } from '@material-ui/core';

export const useStyles = makeStyles(
  theme => ({
    rangeInputsContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    toLabelDelimiter: {
      margin: '0 16px',
    },
    highlighted: {
      backgroundColor: theme.palette.grey[500],
    },
  }),
  { name: 'MuiPickersDateRangePickerInput' }
);

export interface ExportedDateRangePickerInputProps {
  toText?: React.ReactNode;
  rangeChangingStrategy?: 'expand' | 'circular';
}

interface DateRangeInputProps
  extends ExportedDateRangePickerInputProps,
    DateInputProps<RangeInput, DateRange> {
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectionEnd: 'start' | 'end') => void;
}

// prettier-ignore
export const DateRangePickerInput: React.FC<DateRangeInputProps> = ({
  toText = 'to',
  rawValue,
  onChange,
  onClick,
  parsedDateValue,
  id,
  className,
  forwardedRef,
  currentlySelectingRangeEnd,
  setCurrentlySelectingRangeEnd,
  openPicker,
  ...other
}) => {
  const utils = useUtils()
  const classes = useStyles();
  const startRef = React.useRef<HTMLInputElement>(null)
  const endRef = React.useRef<HTMLInputElement>(null)
  const [start, end] = parsedDateValue ?? [null, null];

  React.useEffect(() => {
    if (currentlySelectingRangeEnd === 'start') {
      startRef.current?.focus()
    } else {
      endRef.current?.focus()
    }
  }, [currentlySelectingRangeEnd])

  const handleStartChange = (date: MaterialUiPickersDate, inputString?: string) => {
    if (date === null || utils.isValid(date)) {
      onChange([date, end], inputString);
    }
  };

  const handleEndChange = (date: MaterialUiPickersDate, inputString?: string) => {
    if (utils.isValid(date)) {
      onChange([start, date], inputString);
    }
  };

  const openRangeStartSelection = () => {
    setCurrentlySelectingRangeEnd('start')
    openPicker()
  }

  const openRangeEndSelection = () => {
    setCurrentlySelectingRangeEnd('end')
    openPicker()
  }

  return (
    <div id={id} className={clsx(classes.rangeInputsContainer, className)} ref={forwardedRef}>
      <KeyboardDateInput
        {...other}
        forwardedRef={startRef}
        rawValue={start}
        parsedDateValue={start}
        onChange={handleStartChange}
        hideOpenPickerButton
        openPicker={() => {}}
        onFocus={openRangeStartSelection}
        className={clsx({ [classes.highlighted]: currentlySelectingRangeEnd !== 'end' })}
      />

      <Typography className={classes.toLabelDelimiter}>{toText}</Typography>

      <KeyboardDateInput
        {...other}
        forwardedRef={endRef}
        rawValue={end}
        parsedDateValue={end}
        onChange={handleEndChange}
        hideOpenPickerButton
        openPicker={() => {}}
        onFocus={openRangeEndSelection}
      />
    </div>
  );
};
