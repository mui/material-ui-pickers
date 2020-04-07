import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import { RangeInput, DateRange } from './RangeTypes';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '../typings/date';
import { DateInputProps } from '../_shared/PureDateInput';
import { CurrentlySelectingRangeEndProps } from './RangeTypes';
import { createDelegatedEventHandler } from '../_helpers/utils';

export const useStyles = makeStyles(
  theme => ({
    rangeInputsContainer: {
      display: 'flex',
      alignItems: 'center',
      // ? TBD
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    toLabelDelimiter: {
      margin: '8px 0',
      [theme.breakpoints.up('sm')]: {
        margin: '0 16px',
      },
    },
  }),
  { name: 'MuiPickersDateRangePickerInput' }
);

export interface ExportedDateRangePickerInputProps {
  toText?: React.ReactNode;
}

export interface DateRangeInputProps
  extends ExportedDateRangePickerInputProps,
    CurrentlySelectingRangeEndProps,
    DateInputProps<RangeInput, DateRange> {
  startText: React.ReactNode;
  endText: React.ReactNode;
}

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
  readOnly,
  disableOpenPicker,
  startText,
  endText,
  ...other
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const startRef = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLInputElement>(null);
  const [start, end] = parsedDateValue;

  React.useEffect(() => {
    if (!open) {
      return;
    }

    if (currentlySelectingRangeEnd === 'start') {
      startRef.current?.focus();
    } else if (currentlySelectingRangeEnd === 'end') {
      endRef.current?.focus();
    }
  }, [currentlySelectingRangeEnd, open]);

  const handleStartChange = (date: MaterialUiPickersDate, inputString?: string) => {
    if (date === null || utils.isValid(date)) {
      onChange([date, end], inputString);
    }
  };

  const handleEndChange = (date: MaterialUiPickersDate, inputString?: string) => {
    if (date === null || utils.isValid(date)) {
      onChange([start, date], inputString);
    }
  };

  const openRangeStartSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('start');
    }
    if (!disableOpenPicker) {
      openPicker();
    }
  };

  const openRangeEndSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('end');
    }
    if (!disableOpenPicker) {
      openPicker();
    }
  };

  return (
    <div id={id} className={clsx(classes.rangeInputsContainer, className)} ref={containerRef}>
      <KeyboardDateInput
        {...other}
        open={open}
        forwardedRef={startRef}
        rawValue={start}
        parsedDateValue={start}
        onChange={handleStartChange}
        disableOpenPicker
        openPicker={() => {}}
        readOnly={readOnly}
        label={startText}
        focused={open && currentlySelectingRangeEnd === 'start'}
        onClick={
          readOnly ? createDelegatedEventHandler(openRangeStartSelection, onClick) : undefined
        }
        onFocus={
          !readOnly ? createDelegatedEventHandler(openRangeStartSelection, onFocus) : undefined
        }
      />

      <Typography className={classes.toLabelDelimiter}>{toText}</Typography>

      <KeyboardDateInput
        {...other}
        open={open}
        forwardedRef={endRef}
        rawValue={end}
        parsedDateValue={end}
        onChange={handleEndChange}
        disableOpenPicker
        openPicker={() => {}}
        readOnly={readOnly}
        label={endText}
        focused={open && currentlySelectingRangeEnd === 'end'}
        onClick={readOnly ? createDelegatedEventHandler(openRangeEndSelection, onClick) : undefined}
        onFocus={
          !readOnly ? createDelegatedEventHandler(openRangeEndSelection, onFocus) : undefined
        }
      />
    </div>
  );
};
