import { mount } from 'enzyme';
import React from 'react';

describe('MuiIcon', () => {
  it('Should render @material-ui/icons by default', () => {
    const MuiIcon = require('../../_shared/MuiIcon').default;
    const component = mount(<MuiIcon icon="event" />);

    expect(component.find('svg').length).toBe(1);
  });

  it('Should render string if there is no @material-ui/icons', () => {
    jest.resetModules();
    jest.mock('@material-ui/icons/Event', () => null);

    const MuiIcon = require('../../_shared/MuiIcon').default;
    const component = mount(<MuiIcon icon="event" />);

    expect(component.find('svg').length).toBe(0);
  });
});
