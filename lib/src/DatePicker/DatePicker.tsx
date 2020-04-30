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

export interface BaseDatePickerProps
  extends WithViewsProps<'year' | 'date' | 'month'>,
    ValidationProps<DateValidationError, ParsableDate>,
    ExportedCalendarViewProps {}

const datePickerConfig = {
  useValidation: makeValidationHook<DateValidationError, ParsableDate, BaseDatePickerProps>(
    validateDate
  ),
  DefaultToolbarComponent: DatePickerToolbar,
  useDefaultProps: ({ openTo = 'date', views = ['year', 'date'] }: BaseDatePickerProps) => {
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

export const DatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(
  ResponsiveWrapper,
  datePickerConfig
);

export type DatePickerProps = React.ComponentProps<typeof DatePicker>;

export const MobileDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(
  ModalWrapper,
  datePickerConfig
);

export type MobileDatePickerProps = React.ComponentProps<typeof MobileDatePicker>;

export const DesktopDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(
  InlineWrapper,
  datePickerConfig
);

export type DesktopDatePickerProps = React.ComponentProps<typeof DesktopDatePicker>;

export const StaticDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(
  StaticWrapper,
  datePickerConfig
);

export type StaticDatePickerProps = React.ComponentProps<typeof StaticDatePicker>;
