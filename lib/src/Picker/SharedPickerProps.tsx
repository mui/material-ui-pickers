import { DateTimePickerView } from '../DateTimePicker';
import { ParsableDate } from '../constants/prop-types';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { DateInputPropsLike } from '../wrappers/Wrapper';
import { PickerOnChangeFn } from '../_shared/hooks/useViews';
import { ExportedDateInputProps } from '../_shared/PureDateInput';
import { WithDateAdapterProps } from '../_shared/withDateAdapterProp';

export type AnyPickerView = DateTimePickerView;

export type AllSharedPickerProps<
  TInputValue = ParsableDate,
  TDateValue = MaterialUiPickersDate
> = BasePickerProps<TInputValue, TDateValue> &
  ExportedDateInputProps<TInputValue, TDateValue> &
  WithDateAdapterProps;

export interface SharedPickerProps<
  TInputValue,
  TDateValue,
  TInputProps = DateInputPropsLike<TInputValue, TDateValue>
> {
  isMobileKeyboardViewOpen: boolean;
  toggleMobileKeyboardView: () => void;
  DateInputProps: TInputProps;
  date: TDateValue;
  onDateChange: PickerOnChangeFn<TDateValue>;
}

export interface WithViewsProps<T extends AnyPickerView> {
  /**
   * Array of views to show.
   */
  views?: T[];
  /**
   * First view to show.
   */
  openTo?: T;
}
