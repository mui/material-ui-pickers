import LuxonUtils from '@date-io/luxon';
import DateFnsUtils from '@date-io/date-fns';
import { utilsToUse } from '../test-utils';
import {
  maskedDateFormatter,
  pick12hOr24hFormat,
  checkMaskIsValidForCurrentFormat,
} from '../../_helpers/text-field-helper';

const refuse = /[^\d]+/gi;
describe('test-field-helper', () => {
  test('maskedDateFormatter', () => {
    const formatterFn = maskedDateFormatter('__/__/____', '_', refuse);

    expect(formatterFn('21')).toBe('21/__/____');
    expect(formatterFn('21-12-21')).toBe('21/12/21__');
    expect(formatterFn('21-12-2010')).toBe('21/12/2010');
  });

  test('pick12hOr24hFormat', () => {
    expect(pick12hOr24hFormat(undefined, true, { '12h': 'hh:mm a', '24h': 'HH:mm' })).toBe(
      'hh:mm a'
    );
    expect(pick12hOr24hFormat(undefined, undefined, { '12h': 'hh:mm a', '24h': 'HH:mm' })).toBe(
      'hh:mm a'
    );
    expect(pick12hOr24hFormat(undefined, false, { '12h': 'hh:mm a', '24h': 'HH:mm' })).toBe(
      'HH:mm'
    );
  });

  test.each`
    format                                             | mask            | expected
    ${utilsToUse.formats.keyboardDate}                 | ${'__/__/____'} | ${true}
    ${utilsToUse.formats.keyboardDate}                 | ${'__.__.____'} | ${false}
    ${utilsToUse.formats.fullTime}                     | ${'__:__ _M'}   | ${true}
    ${{ dateFns: 'MM/dd/yyyy', moment: 'MM/DD/YYYY' }} | ${'__/__/____'} | ${true}
  `(
    'checkMaskIsValidFormat returns $expected for mask $mask and format $format',
    ({ format, mask, expected }) => {
      const formatForCurrentLib =
        typeof format === 'string'
          ? format
          : utilsToUse instanceof DateFnsUtils || utilsToUse instanceof LuxonUtils
          ? format.dateFns
          : format.moment;

      expect(
        checkMaskIsValidForCurrentFormat(mask, formatForCurrentLib, /[^\dap]+/gi, utilsToUse)
      ).toBe(expected);
    }
  );
});
