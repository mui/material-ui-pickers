import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { mount, utilsToUse } from '../test-utils';
import { Calendar } from '../../views/Calendar/Calendar';

describe('Calendar - disabled selected date on mount', () => {
  let onChangeMock = jest.fn();
  let component: ReactWrapper<any, any, any>; // eslint-disable-line

  beforeEach(() => {
    const date = utilsToUse.date('01-01-2017');
    component = mount(
      <Calendar
        date={date}
        minDate={new Date('01-01-2018')}
        onChange={onChangeMock}
        slideDirection="left"
        currentMonth={utilsToUse.startOfMonth(date)}
      />
    );
  });

  it('Should dispatch onDateSelect with isFinish = false on mount', () => {
    if (process.env.UTILS === 'moment') {
      return expect(onChangeMock).toHaveBeenCalled();
    }

    expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('01-01-2018'), false);
  });
});
