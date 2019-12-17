import * as React from 'react';
import * as PropTypes from 'prop-types';
import Clock from './Clock';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import { convertToMeridiem, getMeridiem } from '../../_helpers/time-utils';

export interface TimePickerViewProps {
  /** TimePicker value */
  date: MaterialUiPickersDate;
  /** Clock type */
  type: 'hours' | 'minutes' | 'seconds';
  /** 12h/24h clock mode */
  ampm?: boolean;
  /** Minutes step */
  minutesStep?: number;
  /** Display ampm controls in the clock control, instead of toolbar */
  ampmInClock?: boolean;
  /** On change date without moving between views */
  onDateChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On hour change */
  onHourChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On minutes change */
  onMinutesChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On seconds change */
  onSecondsChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

export const ClockView: React.FC<TimePickerViewProps> = ({
  type,
  onDateChange,
  onHourChange,
  onMinutesChange,
  onSecondsChange,
  ampm,
  date,
  minutesStep,
  ampmInClock,
}) => {
  const utils = useUtils();
  const viewProps = React.useMemo(() => {
    switch (type) {
      case 'hours':
        return {
          value: utils.getHours(date),
          children: getHourNumbers({ date, utils, ampm: Boolean(ampm) }),
          onChange: (value: number, isFinish?: boolean) => {
            const currentMeridiem = getMeridiem(date, utils);
            const updatedTimeWithMeridiem = convertToMeridiem(
              utils.setHours(date, value),
              currentMeridiem,
              Boolean(ampm),
              utils
            );

            onHourChange(updatedTimeWithMeridiem, isFinish);
          },
        };

      case 'minutes':
        const minutesValue = utils.getMinutes(date);
        return {
          value: minutesValue,
          children: getMinutesNumbers({ value: minutesValue, utils }),
          onChange: (value: number, isFinish?: boolean) => {
            const updatedTime = utils.setMinutes(date, value);

            onMinutesChange(updatedTime, isFinish);
          },
        };

      case 'seconds':
        const secondsValue = utils.getSeconds(date);
        return {
          value: secondsValue,
          children: getMinutesNumbers({ value: secondsValue, utils }),
          onChange: (value: number, isFinish?: boolean) => {
            const updatedTime = utils.setSeconds(date, value);

            onSecondsChange(updatedTime, isFinish);
          },
        };

      default:
        throw new Error('You must provide the type for TimePickerView');
    }
  }, [ampm, date, onHourChange, onMinutesChange, onSecondsChange, type, utils]);

  return (
    <Clock
      date={date}
      ampmInClock={ampmInClock}
      onDateChange={onDateChange}
      type={type}
      ampm={ampm}
      minutesStep={minutesStep}
      {...viewProps}
    />
  );
};

ClockView.displayName = 'TimePickerView';

// @ts-ignore
ClockView.propTypes = {
  date: PropTypes.object.isRequired,
  onHourChange: PropTypes.func.isRequired,
  onMinutesChange: PropTypes.func.isRequired,
  onSecondsChange: PropTypes.func.isRequired,
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
  type: PropTypes.oneOf(['minutes', 'hours', 'seconds']).isRequired,
};

ClockView.defaultProps = {
  ampm: true,
  minutesStep: 1,
};

export default React.memo(ClockView);
