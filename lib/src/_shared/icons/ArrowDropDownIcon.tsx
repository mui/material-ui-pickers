import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export const ArrowDropDownIcon: React.SFC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <path d="M7 10l5 5 5-5z" />
    </SvgIcon>
  );
};
