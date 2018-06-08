import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import PickerBase from '../../src/_shared/PickerBase';

const initialProps = {
  value: undefined,
  onChange: jest.fn(),
  autoOk: false,
  format: 'MM-DD-YYYY',
  labelFunc: jest.fn(),
  ampm: false,
  utils: utilsToUse,
  minDate: '1900-01-01',
  maxDate: '2100-12-31',
};

class DerivedComponent extends PickerBase {
  render() {
    return null;
  }
}
const areDatesEffectivelyEqual = (firstDate, secondDate) => {
  const diff = utilsToUse.getDiff(firstDate, secondDate);

  return Math.abs(diff) < 1000;
};

describe('PickerBase', () => {
  it('renders', () => {
    const wrapper = shallow(<DerivedComponent {...initialProps} />);

    expect(wrapper).toBeTruthy();
  });

  describe('getValidDateOrCurrent', () => {
    const getGetValidDateOrCurrentFunc = (props) => {
      const wrapper = shallow(<DerivedComponent {...props} />);
      return wrapper.instance().getValidDateOrCurrent;
    };
    it('returns value as date if value is defined', () => {
      const props = {
        ...initialProps,
        value: utilsToUse.date('2018-01-01'),
      };

      const getValidDateOrCurrentFunc = getGetValidDateOrCurrentFunc(props);

      const dateValue = getValidDateOrCurrentFunc();

      expect(areDatesEffectivelyEqual(dateValue, props.value)).toBe(true);
    });
    it('returns utils.date() if value is defined but not valid', () => {
      const props = {
        ...initialProps,
        value: '2018-01-32',
      };

      const getValidDateOrCurrentFunc = getGetValidDateOrCurrentFunc(props);

      const dateValue = getValidDateOrCurrentFunc();

      expect(areDatesEffectivelyEqual(dateValue, utilsToUse.date())).toBe(true);
    });

    it('returns utils.date() if value not provided and today is between minDate and maxDate', () => {
      const today = utilsToUse.date();
      const props = {
        ...initialProps,
        minDate: utilsToUse.addDays(today, -2),
        maxDate: utilsToUse.addDays(today, 2),
        value: undefined,
      };

      const getValidDateOrCurrentFunc = getGetValidDateOrCurrentFunc(props);

      const dateValue = getValidDateOrCurrentFunc();

      expect(areDatesEffectivelyEqual(dateValue, today)).toBe(true);
    });
    it('returns minDate if value is not provided and minDate is after today', () => {
      const today = utilsToUse.date();
      const props = {
        ...initialProps,
        minDate: utilsToUse.addDays(today, 2),
        value: undefined,
      };

      const getValidDateOrCurrentFunc = getGetValidDateOrCurrentFunc(props);

      const dateValue = getValidDateOrCurrentFunc();

      expect(utilsToUse.isEqual(dateValue, props.minDate)).toBe(true);
    });
    it('returns maxDate if value is not provided and maxDate is before today', () => {
      const today = utilsToUse.date();
      const props = {
        ...initialProps,
        maxDate: utilsToUse.addDays(today, -2),
        value: undefined,
      };

      const getValidDateOrCurrentFunc = getGetValidDateOrCurrentFunc(props);

      const dateValue = getValidDateOrCurrentFunc();

      expect(areDatesEffectivelyEqual(dateValue, props.maxDate)).toBe(true);
    });
  });
});
