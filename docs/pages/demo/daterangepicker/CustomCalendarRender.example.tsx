import * as React from 'react';
import { DateRangePicker, DateRange, DateRangeDelimiter, PickersCalendar, PickersCalendarProps } from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";

interface CalendarWithValidationButtonProps extends PickersCalendarProps<Date> {
  validateCustomPeriod: () => void;
}

function CalendarWithValidationButton ({ validateCustomPeriod, ...pickersCalendarProps }: CalendarWithValidationButtonProps) {
  return (
    <React.Fragment>
      <PickersCalendar {...pickersCalendarProps} />

      <button
        type="button"
        className="button date-dropdown__button--validate button--small button--alert"
        onClick={validateCustomPeriod}
      >
        Validate
      </button>
    </React.Fragment>
  );
}

export default function CustomCalendarRender() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <DateRangePicker
      startText="Check-in"
      endText="Check-out"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      slotComponents={{ Calendar: CalendarWithValidationButton }}
      // @ts-ignore
      slotProps={{ Calendar: { validateCustomPeriod: setValue } }}
      renderInput={(startProps, endProps) => (
        <React.Fragment>
          <TextField {...startProps} />
          <DateRangeDelimiter> to </DateRangeDelimiter>
          <TextField {...endProps} />
        </React.Fragment>
      )}
    />
  );
}
