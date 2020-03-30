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
      margin: '0 16px',
      [theme.breakpoints.down('xs')]: {
        margin: '8px 0',
      },
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

export interface DateRangeInputProps
  extends ExportedDateRangePickerInputProps,
    CurrentlySelectingRangeEndProps,
    DateInputProps<RangeInput, DateRange> {}

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
  ...other
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const startRef = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLInputElement>(null);
  const [start, end] = parsedDateValue ?? [null, null];

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
    if (!disableOpenPicker && setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('start');
      openPicker();
    }
  };

  const openRangeEndSelection = () => {
    if (!disableOpenPicker && setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('end');
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
        onClick={
          readOnly ? createDelegatedEventHandler(openRangeStartSelection, onClick) : undefined
        }
        onFocus={
          !readOnly ? createDelegatedEventHandler(openRangeStartSelection, onFocus) : undefined
        }
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
        disableOpenPicker
        openPicker={() => {}}
        readOnly={readOnly}
        onClick={readOnly ? createDelegatedEventHandler(openRangeEndSelection, onClick) : undefined}
        onFocus={
          !readOnly ? createDelegatedEventHandler(openRangeEndSelection, onFocus) : undefined
        }
        className={clsx({ [classes.highlighted]: currentlySelectingRangeEnd === 'end' })}
      />
    </div>
  );
};
