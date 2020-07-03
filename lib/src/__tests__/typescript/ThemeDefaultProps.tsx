// Related: ../../__tests__/typings.d.ts
import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
  props: {
    MuiPickerDatePicker: {
      disableMaskedInput: true,
    },
    MuiPickerTimePicker: {
      ampmInClock: true,
    },
    MuiPickerDay: {
      showDaysOutsideCurrentMonth: true,
    },
    MuiPickerCalendarView: {
      reduceAnimations: true,
    },
  },
});

// Allows to mix overrides for both pickers and core components
createMuiTheme({
  props: {
    MuiPickerCalendarView: {
      reduceAnimations: true,
    },
    MuiPopover: {
      open: false,
    },
  },
});

// Throws error if class key is invalid
createMuiTheme({
  props: {
    MuiPickerCalendarView: {
      // @ts-expect-error: Throws error if class key is invalid
      somethingInvalid: 123,
    },
    MuiPickerDay: {
      onSuspend: () => {},
      // @ts-expect-error: Throws error if class key is invalid
      showDaysOutsideCurrentMonthTypo: false,
    },
  },
});
