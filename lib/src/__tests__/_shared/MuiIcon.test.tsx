import { mount } from 'enzyme';
import React from 'react';
import MuiIcon from '../../_shared/MuiIcon';

describe('MuiIcon', () => {
  it('Should render @material-ui/icons by default', () => {
    const component = mount(<MuiIcon icon="event" />);

    expect(component.find('svg').length).toBe(1);
  });

  it('Should render string if there is no @material-ui/icons', () => {
    jest.resetModules();
    jest.mock('@material-ui/icons/Event', () => null);

    const MuiIconWithoutPackage = require('../../_shared/MuiIcon').default;
    const component = mount(<MuiIconWithoutPackage icon="event" />);

    expect(component.find('svg').length).toBe(0);
  });
});
