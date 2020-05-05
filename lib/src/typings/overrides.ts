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
  MuiBasePicker?: Classes<typeof import('../Picker/Picker').useStyles>;
  MuiCalendar?: Classes<typeof import('../views/Calendar/Calendar').useStyles>;
  MuiCalendarView?: Classes<typeof import('../views/Calendar/CalendarView').useStyles>;
  MuiClock?: Classes<typeof import('../views/Clock/Clock').useStyles>;
  MuiClockView?: Classes<typeof import('../views/Clock/ClockView').useStyles>;
  MuiDay?: Classes<typeof import('../views/Calendar/Day').useStyles>;
}
