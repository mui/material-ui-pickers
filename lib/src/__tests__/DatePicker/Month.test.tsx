import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { Month, MonthProps } from '../../DatePicker/components/Month';

describe('Month', () => {
  let component: ShallowWrapper<MonthProps>;

  beforeEach(() => {
    component = shallow(
      <Month classes={{} as any} value={utilsToUse.date('01-01-2017')} onSelect={jest.fn()}>
        Oct
      </Month>
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
