import * as React from 'react';
import { useUtils } from '../_shared/hooks/useUtils';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { DesktopWrapper } from '../wrappers/DesktopWrapper';
import { makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';

interface RangePickerProps {
  value: [ParsableDate, ParsableDate];
  onChange: (value: [MaterialUiPickersDate, MaterialUiPickersDate] | null) => void;
}

const RangePicker: React.FC<RangePickerProps> = ({}) => {
  return <div>makePickerWithStateAndWrapper</div>;
};

export const DateRangePicker = makePickerWithStateAndWrapper<
  RangePickerProps,
  [ParsableDate, ParsableDate],
  [MaterialUiPickersDate, MaterialUiPickersDate]
>(DesktopWrapper, {
  KeyboardDateInputComponent: RangePicker,
  PureDateInputComponent: RangePicker,
  PickerComponent: RangePicker,
  useDefaultProps: () => ({
    inputFormat: 'mmm',
  }),
  DefaultToolbarComponent: () => null,
  useParseInputValue: ({ value }) => {
    const utils = useUtils();
    return value.map(unparsedValue => utils.date(unparsedValue)) as [
      MaterialUiPickersDate,
      MaterialUiPickersDate
    ];
  },
});

<DateRangePicker value={[]} />;
