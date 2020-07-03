import { useStyles as DayStyles } from '../views/Calendar/Day';
import { useStyles as ClockStyles } from '../views/Clock/Clock';
import { useStyles as MuiBasePickerStyles } from '../Picker/Picker';
import { useStyles as CalendarStyles } from '../views/Calendar/Calendar';
import { useStyles as MuiPickerYearStyles } from '../views/Calendar/Year';
import { styles as ClockPointerStyles } from '../views/Clock/ClockPointer';
import { useStyles as ToolbarButtonStyles } from '../_shared/ToolbarButton';
import { useStyles as PickerToolbarStyles } from '../_shared/PickerToolbar';
import { useStyles as ClockNumberStyles } from '../views/Clock/ClockNumber';
import { useStyles as MuiPickerMonthStyles } from '../views/Calendar/Month';
import { useStyles as CalendarViewStyles } from '../views/Calendar/CalendarView';
import { useStyles as MuiPickerToolbarTextStyles } from '../_shared/ToolbarText';
import { useStyles as DatePickerRootStyles } from '../DatePicker/DatePickerToolbar';
import { useStyles as CalendarHeaderStyles } from '../views/Calendar/CalendarHeader';
import { StyleRules, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { useStyles as TimePickerToolbarStyles } from '../TimePicker/TimePickerToolbar';
import { useStyles as SlideTransitionStyles } from '../views/Calendar/SlideTransition';
import { useStyles as MuiPickerYearSelectionStyles } from '../views/Calendar/YearSelection';
import { useStyles as MuiPickerMonthSelectionStyles } from '../views/Calendar/MonthSelection';

type StylesHook<C extends string> = (props?: any) => Record<C, string>;

type Classes<T> = T extends string
  ? T
  : T extends StylesHook<infer C>
  ? C
  : T extends StyleRulesCallback<any, any, infer K>
  ? K
  : T extends StyleRules<infer D>
  ? D
  : never;

export interface MuiPickersComponentsToClassName {
  MuiPickerDay: Classes<typeof DayStyles>;
  MuiPickerCalendar: Classes<typeof CalendarStyles>;
  MuiPickerCalendarView: Classes<typeof CalendarViewStyles>;
  MuiPickerCalendarHeader: Classes<typeof CalendarHeaderStyles>;
  MuiPickerSlideTransition: Classes<typeof SlideTransitionStyles>;
  MuiPickerYearSelection: Classes<typeof MuiPickerYearSelectionStyles>;
  MuiPickerYear: Classes<typeof MuiPickerYearStyles>;
  MuiPickerMonthSelection: Classes<typeof MuiPickerMonthSelectionStyles>;
  MuiPickerMonth: Classes<typeof MuiPickerMonthStyles>;
  MuiPickerTimePickerToolbar: Classes<typeof TimePickerToolbarStyles>;
  MuiPickerClock: Classes<typeof ClockStyles>;
  MuiPickerClockNumber: Classes<typeof ClockNumberStyles>;
  MuiPickerClockPointer: Classes<typeof ClockPointerStyles>;
  MuiPickerToolbar: Classes<typeof PickerToolbarStyles>;
  MuiPickerToolbarButton: Classes<typeof ToolbarButtonStyles>;
  MuiPickerToolbarText: Classes<typeof MuiPickerToolbarTextStyles>;
  MuiPickerDatePickerRoot: Classes<typeof DatePickerRootStyles>;
  MuiPickerBasePicker: Classes<typeof MuiBasePickerStyles>;
  MuiPickerModalDialog: Classes<typeof import('../_shared/PickerModalDialog').useStyles>;
  MuiDateTimePickerTabs: Classes<typeof import('../DateTimePicker/DateTimePickerTabs').useStyles>;
  MuiDateTimePickerToolbar: Classes<
    typeof import('../DateTimePicker/DateTimePickerToolbar').useStyles
  >;
  // consider using inline import type notation
  MuiPickerDesktopDateRangeCalendar: Classes<
    typeof import('../DateRangePicker/DateRangePickerViewDesktop').useStyles
  >;
  MuiPickerArrowSwitcher: Classes<typeof import('../_shared/ArrowSwitcher').useStyles>;
  MuiPickerDateRangePickerInput: Classes<
    typeof import('../DateRangePicker/DateRangePickerInput').useStyles
  >;
  MuiPickerCalendarSkeleton: Classes<typeof import('../CalendarSkeleton').useStyles>;
  MuiPickerPopper: Classes<typeof import('../_shared/PickerPopper').useStyles>;
}
