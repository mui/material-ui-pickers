import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { MonthSelection, MonthSelectionProps } from '../../DatePicker/components/MonthSelection';
import { shallow, utilsToUse } from '../test-utils';

describe('MonthSelection', () => {
  let component: ShallowWrapper<MonthSelectionProps>;

  beforeEach(() => {
    component = shallow(
      <MonthSelection
        classes={{} as any}
        date={utilsToUse.date('01-01-2017')}
        onChange={jest.fn()}
        utils={utilsToUse}
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
