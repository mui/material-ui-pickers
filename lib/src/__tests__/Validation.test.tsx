import * as React from 'react';
import { isWeekend } from 'date-fns';
import { MaterialUiPickersDate } from '../typings/date';
import { DesktopDatePicker } from '../DatePicker/DatePicker';
import { mountPickerWithState, utilsToUse } from './test-utils';

const disableWeekends = (date: MaterialUiPickersDate) => {
  return isWeekend(utilsToUse.toJsDate(date));
};

describe('DatePicker validation', () => {
  test.each`
    props                                     | input            | expectedError
    ${{}}                                     | ${'invalidText'} | ${'invalidDate'}
    ${{ disablePast: true }}                  | ${'01/01/1900'}  | ${'disablePast'}
    ${{ disableFuture: true }}                | ${'01/01/2050'}  | ${'disableFuture'}
    ${{ minDate: new Date('01/01/2000') }}    | ${'01/01/1990'}  | ${'minDate'}
    ${{ maxDate: new Date('01/01/2000') }}    | ${'01/01/2010'}  | ${'maxDate'}
    ${{ shouldDisableDate: disableWeekends }} | ${'04/25/2020'}  | ${'shouldDisableDate'}
  `('Should dispatch onError $expectedError', ({ props, input, expectedError }) => {
    const onErrorMock = jest.fn();
    const component = mountPickerWithState(utilsToUse.date(), stateProps => (
      <DesktopDatePicker {...stateProps} {...props} onError={onErrorMock} />
    ));

    component.find('input').simulate('change', {
      target: {
        value: input,
      },
    });

    expect(onErrorMock).toBeCalledWith(expectedError, expect.anything());
  });

  test('It should properly annulate the error', () => {
    const onErrorMock = jest.fn();
    const component = mountPickerWithState(utilsToUse.date(), stateProps => (
      <DesktopDatePicker {...stateProps} disablePast onError={onErrorMock} />
    ));

    component.find('input').simulate('change', {
      target: {
        value: '01/01/1900',
      },
    });

    expect(onErrorMock).toHaveBeenCalledWith('disablePast', expect.anything());

    component.find('input').simulate('change', {
      target: {
        value: '01/01/2099',
      },
    });

    expect(onErrorMock).toHaveBeenCalledWith(null, expect.anything());
  });
});
