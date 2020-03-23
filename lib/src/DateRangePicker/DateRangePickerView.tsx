import * as React from 'react';
import { RangeInput, DateRange } from './RangeTypes';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { useParsedDate } from '../_shared/hooks/useParsedDate';
import { SharedPickerProps } from '../Picker/SharedPickerProps';
import { useCalendarState } from '../views/Calendar/useCalendarState';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { ExportedCalendarViewProps, defaultReduceAnimations } from '../views/Calendar/CalendarView';
import {
  DesktopDateRangeCalendar,
  ExportedDesktopDateRangeCalendarProps,
} from './DesktopDateRangePicker';

type BaseCalendarPropsToReuse = Omit<ExportedCalendarViewProps, 'onYearChange'>;

export interface DateRangePickerViewProps
  extends BaseCalendarPropsToReuse,
    ExportedDesktopDateRangeCalendarProps,
    SharedPickerProps<RangeInput, DateRange> {
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}

export const DateRangePickerView: React.FC<DateRangePickerViewProps> = ({
  date,
  calendars,
  minDate: unparsedMinDate = new Date('1900-01-01'),
  maxDate: unparsedMaxDate = new Date('2100-01-01'),
  disableFuture,
  disablePast,
  shouldDisableDate,
  disableHighlightToday,
  onMonthChange,
  onDateChange,
  setCurrentlySelectingRangeEnd,
  reduceAnimations = defaultReduceAnimations,
}) => {
  const utils = useUtils();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const minDate = useParsedDate(unparsedMinDate)!;
  const maxDate = useParsedDate(unparsedMaxDate)!;

  const [start, end] = date!;
  const {
    changeMonth,
    calendarState,
    isDateDisabled,
    onMonthSwitchingAnimationEnd,
    changeFocusedDay,
  } = useCalendarState({
    date: start,
    minDate,
    maxDate,
    reduceAnimations,
    disablePast,
    disableFuture,
    onMonthChange,
    shouldDisableDate,
    disableSwitchToMonthOnDayFocus: true,
  });

  const handleChange = React.useCallback(
    (date: MaterialUiPickersDate) => {
      if (start === null || utils.isBefore(date, start)) {
        setCurrentlySelectingRangeEnd('start');
        onDateChange([date, end], wrapperVariant, false);
      } else {
        setCurrentlySelectingRangeEnd('end');
        onDateChange([start, date], wrapperVariant, true);
      }
    },
    [end, onDateChange, setCurrentlySelectingRangeEnd, start, utils, wrapperVariant]
  );

  switch (wrapperVariant) {
    case 'desktop': {
      return (
        <DesktopDateRangeCalendar
          calendars={calendars}
          {...calendarState}
          date={date!}
          isDateDisabled={isDateDisabled}
          changeFocusedDay={changeFocusedDay}
          onChange={handleChange}
          reduceAnimations={reduceAnimations}
          disableHighlightToday={disableHighlightToday}
          onMonthSwitchingAnimationEnd={onMonthSwitchingAnimationEnd}
          changeMonth={changeMonth}
        />
      );
    }

    default: {
      throw new Error('Only desktop wrapper supported for DateRangePicker');
    }
  }
};
