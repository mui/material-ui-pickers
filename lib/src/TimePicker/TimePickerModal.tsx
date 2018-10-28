import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Omit } from '@material-ui/core';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import DomainPropTypes from '../constants/prop-types';
import ModalWrapper, { ModalWrapperProps } from '../wrappers/ModalWrapper';
import TimePicker, { BaseTimePickerProps } from './TimePicker';

export interface TimePickerModalProps
  extends BasePickerProps,
    BaseTimePickerProps,
    Omit<ModalWrapperProps, 'onChange' | 'value'> {}

export const TimePickerModal: React.SFC<TimePickerModalProps> = props => {
  const {
    value,
    format,
    autoOk,
    onChange,
    ampm,
    forwardedRef,
    seconds,
    PickerComponent,
    ...other
  } = props;

  const ThePickerComponent = PickerComponent!;
  return (
    <BasePicker {...props}>
      {({
        date,
        utils,
        handleAccept,
        handleChange,
        handleClear,
        handleDismiss,
        handleSetTodayDate,
        handleTextFieldChange,
        isAccepted,
        pick12hOr24hFormat,
      }) => (
        <ModalWrapper
          ref={forwardedRef}
          value={value}
          onClear={handleClear}
          onAccept={handleAccept}
          onChange={handleTextFieldChange}
          onDismiss={handleDismiss}
          onSetToday={handleSetTodayDate}
          isAccepted={isAccepted}
          format={pick12hOr24hFormat(utils.time12hFormat, utils.time24hFormat)}
          {...other}
        >
          <ThePickerComponent
            date={date}
            onChange={handleChange}
            ampm={ampm}
            seconds={seconds}
          />
        </ModalWrapper>
      )}
    </BasePicker>
  );
};

(TimePickerModal as any).propTypes = {
  /** DateTimepicker value */
  value: DomainPropTypes.date,
  /** Date format string for input */
  format: PropTypes.string,
  /** Callback firing when date accepted [(date: Date) => void] */
  onChange: PropTypes.func.isRequired,
  /** Auto accept date on minute selection */
  autoOk: PropTypes.bool,
  /** 12h/24h view for hour selection clock */
  ampm: PropTypes.bool,
  /** Show the seconds view */
  seconds: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  PickerComponent: DomainPropTypes.component,
};

TimePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  ampm: true,
  forwardedRef: undefined,
  seconds: false,
  PickerComponent: TimePicker,
};

export default React.forwardRef((props: TimePickerModalProps, ref) => (
  <TimePickerModal {...props} forwardedRef={ref} />
));
