import * as React from 'react';
import { onSpaceOrEnter } from '../../_helpers/utils';
import { MaterialUiPickersDate } from '../../typings/date';
import { onChangeFunction } from '../../_shared/hooks/useViews';
import { FORCE_FINISH_PICKER } from '../../_shared/hooks/usePickerState';

export interface DayWrapperProps {
  value: MaterialUiPickersDate;
  children: React.ReactNode;
  dayInCurrentMonth?: boolean;
  disabled?: boolean;
  onSelect: onChangeFunction;
}

const DayWrapper: React.FC<DayWrapperProps> = ({
  children,
  value,
  disabled,
  onSelect,
  dayInCurrentMonth,
  ...other
}) => {
  const handleSelection = (isFinish: symbol | boolean) => {
    if (dayInCurrentMonth && !disabled) {
      onSelect(value, isFinish);
    }
  };

  return (
    <div
      role="cell"
      onClick={() => handleSelection(true)}
      onKeyPress={onSpaceOrEnter(() => handleSelection(FORCE_FINISH_PICKER))}
      children={children}
      {...other}
    />
  );
};

export default DayWrapper;
