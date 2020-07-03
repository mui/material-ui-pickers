import { PickerProps } from '../Picker/Picker';
import { CalendarSkeletonProps } from '../CalendarSkeleton';
import { DateRangeDelimiterProps } from '../DateRangePicker/DateRangeDelimiter';
import {
  ToolbarComponentProps,
  LocalizationProviderProps,
  ClockViewProps,
  CalendarProps,
  ClockProps,
  DayProps,
  DatePickerProps,
  MobileDatePickerProps,
  DesktopDatePickerProps,
  StaticDatePickerProps,
  CalendarViewProps,
  TimePickerProps,
  MobileTimePickerProps,
  DesktopTimePickerProps,
  StaticTimePickerProps,
  DateTimePickerProps,
  MobileDateTimePickerProps,
  DesktopDateTimePickerProps,
  StaticDateTimePickerProps,
  DateRangePickerProps,
  MobileDateRangePickerProps,
  DesktopDateRangePickerProps,
  StaticDateRangePickerProps,
} from '..';

export interface MuiPickersComponentsPropsList {
  MuiPickerDay: DayProps;
  MuiPickerCalendarView: CalendarViewProps;
  MuiPickerDatePicker: DatePickerProps;
  MuiPickerMobileDatePicker: MobileDatePickerProps;
  MuiPickerDesktopDatePicker: DesktopDatePickerProps;
  MuiPickerStaticDatePicker: StaticDatePickerProps;
  MuiPickerTimePicker: TimePickerProps;
  MuiPickerMobileTimePicker: MobileTimePickerProps;
  MuiPickerDesktopTimePicker: DesktopTimePickerProps;
  MuiPickerStaticTimePicker: StaticTimePickerProps;
  MuiPickerDateTimePicker: DateTimePickerProps;
  MuiPickerMobileDateTimePicker: MobileDateTimePickerProps;
  MuiPickerDesktopDateTimePicker: DesktopDateTimePickerProps;
  MuiPickerStaticDateTimePicker: StaticDateTimePickerProps;
  MuiPickerCalendar: CalendarProps;
  MuiPickerClockView: ClockViewProps;
  MuiPickerClock: ClockProps;
  MuiPickerBasePicker: PickerProps<any, any, any>;
  MuiPickerLocalizationProvider: LocalizationProviderProps;
  MuiPickerTimePickerToolbar: ToolbarComponentProps;
  MuiPickerDatePickerToolbar: ToolbarComponentProps;
  MuiPickerDateTimePickerToolbar: ToolbarComponentProps;
  MuiPickerDateRangePickerToolbarProps: ToolbarComponentProps;
  MuiPickerDateRangePicker: DateRangePickerProps;
  MuiPickerDesktopDateRangePicker: DesktopDateRangePickerProps;
  MuiPickerMobileDateRangePicker: MobileDateRangePickerProps;
  MuiPickerStaticDateRangePicker: StaticDateRangePickerProps;
  MuiPickerDateRangeDelimiter: DateRangeDelimiterProps;
  MuiPickerCalendarSkeleton: CalendarSkeletonProps;
}
