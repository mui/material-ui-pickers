import { ParsableDate } from '../constants/prop-types';
import { AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { ExportedDateRangePickerInputProps } from './DateRangePickerInput';

export type RangeInput = [ParsableDate, ParsableDate];
export type DateRange = [unknown, unknown];

export type AllSharedDateRangePickerProps = Omit<
  AllSharedPickerProps<RangeInput, DateRange>,
  'renderInput'
> &
  ExportedDateRangePickerInputProps;

export interface CurrentlySelectingRangeEndProps {
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}
