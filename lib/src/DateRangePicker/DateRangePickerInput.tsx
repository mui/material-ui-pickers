import * as React from 'react';
import clsx from 'clsx';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import { RangeInput, DateRange } from './RangeTypes';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { DateInputProps } from '../_shared/PureDateInput';
import { makeStyles, Typography } from '@material-ui/core';
import { createDelegatedEventHandler } from '../_helpers/utils';

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
      backgroundColor: theme.palette.divider,
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
  open,
  className,
  containerRef,
  forwardedRef,
  currentlySelectingRangeEnd,
  setCurrentlySelectingRangeEnd,
  openPicker,
  onFocus,
  ...other
}) => {
  const utils = useUtils()
  const classes = useStyles();
  const startRef = React.useRef<HTMLInputElement>(null)
  const endRef = React.useRef<HTMLInputElement>(null)
  const [start, end] = parsedDateValue ?? [null, null];

  React.useEffect(() => {
    if (!open) {
      return
    }

    if (currentlySelectingRangeEnd === 'start') {
      startRef.current?.focus()
    } else {
      endRef.current?.focus()
    }
  }, [currentlySelectingRangeEnd, open])

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
    <div id={id} className={clsx(classes.rangeInputsContainer, className)} ref={containerRef}>
      <KeyboardDateInput
        {...other}
        open={open}
        forwardedRef={startRef}
        rawValue={start}
        parsedDateValue={start}
        onChange={handleStartChange}
        hideOpenPickerButton
        openPicker={() => {}}
        onFocus={createDelegatedEventHandler(openRangeStartSelection, onFocus)}
        className={clsx({ [classes.highlighted]: currentlySelectingRangeEnd === 'start' })}
      />

      <Typography className={classes.toLabelDelimiter}>{toText}</Typography>

      <KeyboardDateInput
        {...other}
        open={open}
        forwardedRef={endRef}
        rawValue={end}
        parsedDateValue={end}
        onChange={handleEndChange}
        hideOpenPickerButton
        openPicker={() => {}}
        onFocus={createDelegatedEventHandler(openRangeEndSelection, onFocus)}
        className={clsx({ [classes.highlighted]: currentlySelectingRangeEnd === 'end' })}
      />
    </div>
  );
};
