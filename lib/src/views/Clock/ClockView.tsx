import * as React from 'react';
import * as PropTypes from 'prop-types';
import Clock from './Clock';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { onChangeFunction } from '../../_shared/hooks/useViews';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import { convertToMeridiem, getMeridiem } from '../../_helpers/time-utils';

export interface BaseClockViewProps {
  /**
   * 12h/24h view for hour selection clock
   * @default true
   */
  ampm?: boolean;
  /**
   * Step over minutes
   * @default 1
   */
  minutesStep?: number;
  /**
   * Display ampm controls under the clock (instead of in the toolbar)
   * @default false
   */
  ampmInClock?: boolean;
}

export interface ClockViewProps extends BaseClockViewProps {
  /** Selected date @DateIOType */
  date: MaterialUiPickersDate;
  /** Clock type */
  type: 'hours' | 'minutes' | 'seconds';
  /** On change date without moving between views @DateIOType */
  onDateChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On change callback @DateIOType */
  onChange: onChangeFunction;
}

export const ClockView: React.FC<ClockViewProps> = ({
  type,
  onDateChange,
  onChange,
  ampm,
  date,
  minutesStep,
  ampmInClock,
}) => {
  const utils = useUtils();
  const viewProps = React.useMemo(() => {
    switch (type) {
      case 'hours':
        const handleHoursChange = (value: number, isFinish?: boolean) => {
          const currentMeridiem = getMeridiem(date, utils);
          const updatedTimeWithMeridiem = convertToMeridiem(
            utils.setHours(date, value),
            currentMeridiem,
            Boolean(ampm),
            utils
          );

          onChange(updatedTimeWithMeridiem, isFinish);
        };

        return {
          onChange: handleHoursChange,
          value: utils.getHours(date),
          children: getHourNumbers({
            date,
            utils,
            onChange: handleHoursChange,
            ampm: Boolean(ampm),
          }),
        };

      case 'minutes':
        const minutesValue = utils.getMinutes(date);
        const handleMinutesChange = (value: number, isFinish?: boolean) => {
          const updatedTime = utils.setMinutes(date, value);

          onChange(updatedTime, isFinish);
        };

        return {
          value: minutesValue,
          onChange: handleMinutesChange,
          children: getMinutesNumbers({
            value: minutesValue,
            onChange: handleMinutesChange,
            utils,
          }),
        };

      case 'seconds':
        const secondsValue = utils.getSeconds(date);
        const handleSecondsChange = (value: number, isFinish?: boolean) => {
          const updatedTime = utils.setSeconds(date, value);

          onChange(updatedTime, isFinish);
        };

        return {
          value: secondsValue,
          onChange: handleSecondsChange,
          children: getMinutesNumbers({
            value: secondsValue,
            onChange: handleSecondsChange,
            utils,
          }),
        };

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [ampm, date, onChange, type, utils]);

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

ClockView.displayName = 'ClockView';

// @ts-ignore
ClockView.propTypes = {
  date: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
  type: PropTypes.oneOf(['minutes', 'hours', 'seconds']).isRequired,
};

ClockView.defaultProps = {
  ampm: true,
  minutesStep: 1,
};

export default React.memo(ClockView);
