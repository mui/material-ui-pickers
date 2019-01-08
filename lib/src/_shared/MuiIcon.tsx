import Icon from '@material-ui/core/Icon';
import * as React from 'react';
import Icons from './Icons';

interface MuiIconProps {
  icon: string | React.ReactNode;
}

export function createMuiIcon(icon: string | React.ReactNode) {
  if (Icons && typeof icon === 'string') {
    const component = Icons[icon];

    if (typeof component === 'function') {
      return React.createElement(component);
    }
  }

  return icon;
}

const MuiIcon: React.SFC<MuiIconProps> = ({ icon }) => {
  return <Icon children={createMuiIcon(icon)} />;
};

export default MuiIcon;
