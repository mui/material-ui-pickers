import * as React from 'react';

export interface DayWrapperProps {
  value: any;
  children: React.ReactNode;
  dayInCurrentMonth?: boolean;
  disabled?: boolean;
  onSelect: (value: any) => void;
}

const DayWrapper: React.FC<DayWrapperProps> = ({
  children,
  value,
  disabled,
  onSelect,
  dayInCurrentMonth,
  ...other
}) => {
  const handleSelection = () => {
    if (dayInCurrentMonth && !disabled) {
      onSelect(value);
    }
  };

  return (
    <div
      role="presentation"
      onClick={handleSelection}
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSelection();

          e.preventDefault();
          e.stopPropagation();
        }
      }}
      children={children}
      {...other}
    />
  );
};

export default DayWrapper;
