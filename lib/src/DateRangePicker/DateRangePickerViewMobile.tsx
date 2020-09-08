import * as React from 'react';
import { CalendarHeader, ExportedCalendarHeaderProps } from '../views/Calendar/CalendarHeader';
import { DateRange } from './RangeTypes';
import { DateRangeDay } from './DateRangePickerDay';
import { useUtils } from '../_shared/hooks/useUtils';
import { Calendar, CalendarProps } from '../views/Calendar/Calendar';
import { defaultMinDate, defaultMaxDate } from '../constants/prop-types';
import { ExportedDesktopDateRangeCalendarProps } from './DateRangePickerViewDesktop';
import {
  isWithinRange,
  isStartOfRange,
  isEndOfRange,
  DateValidationProps,
} from '../_helpers/date-utils';
import { DayProps as CalendarDayProps } from '../views/Calendar/Day';

export interface ExportedMobileDateRangeCalendarProps<TDate>
  extends Pick<ExportedDesktopDateRangeCalendarProps<TDate>, 'renderDay'> {
  /**
   * Custom components. We currently only support Calendar to customize its rendering.
   */
  slotComponents?: {
    Calendar?: React.ElementType;
  };
  /**
   * Extra props passed to the custom components. You can use this to override any props
   * on the base component too.
   */
  slotProps?: {
    Calendar?: CalendarProps<TDate>;
  };
}

interface DesktopDateRangeCalendarProps<TDate>
  extends ExportedMobileDateRangeCalendarProps<TDate>,
    Omit<CalendarProps<TDate>, 'date' | 'renderDay'>,
    DateValidationProps<TDate>,
    ExportedCalendarHeaderProps<TDate> {
  date: DateRange<TDate>;
  changeMonth: (date: TDate) => void;
}

const onlyDateView = ['date'] as ['date'];

export function DateRangePickerViewMobile<TDate>(props: DesktopDateRangeCalendarProps<TDate>) {
  const {
    changeMonth,
    date,
    leftArrowButtonProps,
    leftArrowButtonText,
    leftArrowIcon,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    minDate: __minDate,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    maxDate: __maxDate,
    onChange,
    rightArrowButtonProps,
    rightArrowButtonText,
    rightArrowIcon,
    renderDay = (_, props) => <DateRangeDay<TDate> {...props} />,
    slotComponents = { Calendar },
    slotProps = { Calendar: {} },
    ...other
  } = props;

  const utils = useUtils();
  const minDate = __minDate || utils.date(defaultMinDate);
  const maxDate = __maxDate || utils.date(defaultMaxDate);
  const CalendarComponent = slotComponents.Calendar || Calendar;
  const calendarProps = {
    ...other,
    date,
    onChange,
    renderDay: (day: TDate, _: TDate | null, DayProps: CalendarDayProps<TDate>) =>
      renderDay(day, {
        isPreviewing: false,
        isStartOfPreviewing: false,
        isEndOfPreviewing: false,
        isHighlighting: isWithinRange(utils, day, date),
        isStartOfHighlighting: isStartOfRange(utils, day, date),
        isEndOfHighlighting: isEndOfRange(utils, day, date),
        ...DayProps,
      }),
    ...slotProps.Calendar,
  };

  return (
    <React.Fragment>
      <CalendarHeader
        view="date"
        views={onlyDateView}
        changeView={() => ({})}
        onMonthChange={changeMonth as any}
        leftArrowButtonText={leftArrowButtonText}
        leftArrowButtonProps={leftArrowButtonProps}
        leftArrowIcon={leftArrowIcon}
        rightArrowButtonProps={rightArrowButtonProps}
        rightArrowButtonText={rightArrowButtonText}
        rightArrowIcon={rightArrowIcon}
        minDate={minDate}
        maxDate={maxDate}
        {...other}
      />
      <CalendarComponent {...calendarProps} />
    </React.Fragment>
  );
}
