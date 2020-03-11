import { useUtils } from '../_shared/hooks/useUtils';
import { DatePickerToolbar } from './DatePickerToolbar';
import { getFormatByViews } from '../_helpers/date-utils';
import { WithViewsProps } from '../Picker/WithViewsProps';
import { datePickerDefaultProps } from '../constants/prop-types';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';
import { ModalWrapper, InlineWrapper, StaticWrapper } from '../wrappers/Wrapper';

export type DatePickerView = 'year' | 'date' | 'month';

export interface BaseDatePickerProps
  extends WithViewsProps<'year' | 'date' | 'month'>,
    ExportedCalendarViewProps {}

const datePickerConfig = {
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

export const MobileDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(
  ModalWrapper,
  datePickerConfig
);

export const DesktopDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(
  InlineWrapper,
  datePickerConfig
);

export const StaticDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(
  StaticWrapper,
  datePickerConfig
);
