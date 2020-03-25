import { utilsToUse } from '../test-utils';
import { calculateRangeChange } from '../../DateRangePicker/date-range-manager';

const start2018 = utilsToUse.date(new Date('2018-01-01T00:00:00.000Z'));
const mid2018 = utilsToUse.date(new Date('2018-06-01T00:00:00.000Z'));
const end2019 = utilsToUse.date(new Date('2019-01-01T00:00:00.000Z'));

test.each`
  range                   | selectingEnd | newDate      | expectedRange           | expectedNextSelection
  ${[null, null]}         | ${'start'}   | ${start2018} | ${[start2018, null]}    | ${'end'}
  ${[start2018, null]}    | ${'start'}   | ${end2019}   | ${[end2019, null]}      | ${'end'}
  ${[null, end2019]}      | ${'start'}   | ${mid2018}   | ${[mid2018, end2019]}   | ${'end'}
  ${[mid2018, null]}      | ${'start'}   | ${start2018} | ${[start2018, null]}    | ${'end'}
  ${[start2018, end2019]} | ${'start'}   | ${mid2018}   | ${[mid2018, end2019]}   | ${'end'}
  ${[start2018, end2019]} | ${'end'}     | ${mid2018}   | ${[start2018, mid2018]} | ${'end'}
  ${[mid2018, end2019]}   | ${'start'}   | ${start2018} | ${[start2018, end2019]} | ${'end'}
  ${[start2018, mid2018]} | ${'end'}     | ${mid2018}   | ${[start2018, mid2018]} | ${'end'}
`(
  'calculateRangeChange should return $expectedRange when selecting $selectingEnd of $range with user input $newDate',
  ({ range, selectingEnd, newDate, expectedRange, expectedNextSelection }) => {
    expect(
      calculateRangeChange({
        utils: utilsToUse,
        range,
        newDate,
        currentlySelectingRangeEnd: selectingEnd,
      })
    ).toEqual({
      nextSelection: expectedNextSelection,
      newRange: expectedRange,
    });
  }
);
