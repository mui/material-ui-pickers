import { useUtils } from '../_shared/hooks/useUtils';
import { DatePickerToolbar } from './DatePickerToolbar';
import { WithViewsProps } from '../Picker/SharedPickerProps';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';
import { datePickerDefaultProps, ParsableDate } from '../constants/prop-types';
import { ModalWrapper, InlineWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { makeValidationHook, ValidationProps } from '../_shared/hooks/useValidation';
import { getFormatByViews, validateDate, DateValidationError } from '../_helpers/date-utils';

export type DatePickerView = 'year' | 'date' | 'month';

export interface DatePickerProps
  extends WithViewsProps<'year' | 'date' | 'month'>,
    ValidationProps<DateValidationError, ParsableDate>,
    ExportedCalendarViewProps {}

const datePickerConfig = {
  useValidation: makeValidationHook<DateValidationError, ParsableDate, DatePickerProps>(
    validateDate
  ),
  DefaultToolbarComponent: DatePickerToolbar,
  useDefaultProps: ({ openTo = 'date', views = ['year', 'date'] }: DatePickerProps) => {
    const utils = useUtils();

    return {
      ...datePickerDefaultProps,
      views,
      openTo,
      mask: '__/__/____',
      inputFormat: getFormatByViews(views, utils),
    };
  },
};

export const DatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  ResponsiveWrapper,
  datePickerConfig
);

export const MobileDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  ModalWrapper,
  datePickerConfig
);

export const DesktopDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  InlineWrapper,
  datePickerConfig
);

export const StaticDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  StaticWrapper,
  datePickerConfig
);
