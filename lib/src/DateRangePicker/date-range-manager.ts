import { DateRange } from './DateRangePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';

interface CalculateRangeChangeOptions {
  utils: MuiPickersAdapter;
  range: DateRange;
  newDate: MaterialUiPickersDate;
  currentlySelectingRangeEnd: 'start' | 'end';
}

export function calculateRangeChange({
  utils,
  range,
  newDate: selectedDate,
  currentlySelectingRangeEnd,
}: CalculateRangeChangeOptions): { nextSelection: 'start' | 'end'; newRange: DateRange } {
  const [start, end] = range;
  const isRangeFilledPartially = start === null || end === null;

  if (isRangeFilledPartially) {
  }

  if (currentlySelectingRangeEnd === 'start') {
    return utils.isAfter(selectedDate, end)
      ? { nextSelection: 'end', newRange: [selectedDate, null] }
      : { nextSelection: 'end', newRange: [selectedDate, end] };
  } else {
    return utils.isBefore(selectedDate, start)
      ? { nextSelection: 'end', newRange: [selectedDate, null] }
      : { nextSelection: 'end', newRange: [start, selectedDate] };
  }
}
