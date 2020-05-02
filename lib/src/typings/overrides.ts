import { StyleRules, StyleRulesCallback } from '@material-ui/core/styles/withStyles';

type StylesHook<C extends string> = (props?: any) => Record<C, string>;

type Classes<T> = Partial<
  StyleRules<
    T extends string
      ? T
      : T extends StylesHook<infer C>
      ? C
      : T extends StyleRulesCallback<any, any, infer K>
      ? K
      : T extends StyleRules<infer D>
      ? D
      : never
  >
>;

export interface MuiPickersOverrides {
  MuiArrowSwitcher?: Classes<typeof import('../_shared/ArrowSwitcher').useStyles>;
  MuiBasePickerStyles?: Classes<typeof import('../Picker/Picker').useStyles>;
  MuiCalendar?: Classes<typeof import('../views/Calendar/Calendar').useStyles>;
  MuiCalendarHeader?: Classes<typeof import('../views/Calendar/CalendarHeader').useStyles>;
  MuiCalendarView?: Classes<typeof import('../views/Calendar/CalendarView').useStyles>;
  MuiClock?: Classes<typeof import('../views/Clock/Clock').useStyles>;
  MuiClockNumber?: Classes<typeof import('../views/Clock/ClockNumber').useStyles>;
  MuiClockPointer?: Classes<typeof import('../views/Clock/ClockPointer').styles>;
  MuiDatePickerToolbar?: Classes<typeof import('../DatePicker/DatePickerToolbar').useStyles>;
  MuiDateRangePickerInput?: Classes<
    typeof import('../DateRangePicker/DateRangePickerInput').useStyles
  >;
  MuiDateRangePickerToolbar?: Classes<
    typeof import('../DateRangePicker/DateRangePickerToolbar').useStyles
  >;
  MuiDateRangePickerViewDesktop?: Classes<
    typeof import('../DateRangePicker/DateRangePickerViewDesktop').useStyles
  >;
  MuiDateTimePickerTabs?: Classes<typeof import('../DateTimePicker/DateTimePickerTabs').useStyles>;
  MuiDateTimePickerToolbar?: Classes<
    typeof import('../DateTimePicker/DateTimePickerToolbar').useStyles
  >;
  MuiDay?: Classes<typeof import('../views/Calendar/Day').useStyles>;
  MuiModal?: Classes<typeof import('../_shared/ModalDialog').useStyles>;
  MuiMonth?: Classes<typeof import('../views/Calendar/Month').useStyles>;
  MuiMonthSelection?: Classes<typeof import('../views/Calendar/MonthSelection').useStyles>;
  MuiSlideTransition?: Classes<typeof import('../views/Calendar/SlideTransition').useStyles>;
  MuiTimePickerToolbar?: Classes<typeof import('../TimePicker/TimePickerToolbar').useStyles>;
  MuiToolbar?: Classes<typeof import('../_shared/PickerToolbar').useStyles>;
  MuiToolbarButton?: Classes<typeof import('../_shared/ToolbarButton').useStyles>;
  MuiToolbarText?: Classes<typeof import('../_shared/ToolbarText').useStyles>;
  MuiYear?: Classes<typeof import('../views/Calendar/Year').useStyles>;
  MuiYearSelection?: Classes<typeof import('../views/Calendar/YearSelection').useStyles>;
}
