import * as React from 'react';
import { RangeInput, DateRange } from './RangeTypes';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { calculateRangeChange } from './date-range-manager';
import { useParsedDate } from '../_shared/hooks/useParsedDate';
import { SharedPickerProps } from '../Picker/SharedPickerProps';
import { useCalendarState } from '../views/Calendar/useCalendarState';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { ExportedCalendarViewProps, defaultReduceAnimations } from '../views/Calendar/CalendarView';
import {
  DesktopDateRangePicker,
  ExportedDesktopDateRangeCalendarProps,
} from './DesktopDateRangePicker';

type BaseCalendarPropsToReuse = Omit<ExportedCalendarViewProps, 'onYearChange'>;

export interface DateRangePickerViewProps
  extends BaseCalendarPropsToReuse,
    ExportedDesktopDateRangeCalendarProps,
    SharedPickerProps<RangeInput, DateRange> {
  /**
   * if `true` after selecting `start` date  calendar will not automatically switch to the month of `end` date
   * @default false
   */
  disableAutoMonthSwitching?: boolean;
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}

export const DateRangePickerView: React.FC<DateRangePickerViewProps> = ({
  calendars = 2,
  currentlySelectingRangeEnd,
  date,
  disableAutoMonthSwitching = false,
  disableFuture,
  disableHighlightToday,
  disablePast,
  maxDate: unparsedMaxDate = new Date('2100-01-01'),
  minDate: unparsedMinDate = new Date('1900-01-01'),
  onDateChange,
  onMonthChange,
  reduceAnimations = defaultReduceAnimations,
  setCurrentlySelectingRangeEnd,
  shouldDisableDate,
}) => {
  const utils = useUtils();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const minDate = useParsedDate(unparsedMinDate)!;
  const maxDate = useParsedDate(unparsedMaxDate)!;

  const [start, end] = date;
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

  const scrollToDayIfNeeded = (day: MaterialUiPickersDate) => {
    const currentViewingRange = calendars - 1;
    const currentMonthNumber = utils.getMonth(calendarState.currentMonth);
    const requestedMonthNumber = utils.getMonth(day);

    if (
      requestedMonthNumber < currentMonthNumber ||
      requestedMonthNumber > currentMonthNumber + currentViewingRange
    ) {
      const newMonth =
        currentlySelectingRangeEnd === 'start' ? start : utils.addMonths(end, -currentViewingRange);

      changeMonth(newMonth);
    }
  };

  React.useEffect(() => {
    if (disableAutoMonthSwitching) {
      return;
    }

    if (
      (currentlySelectingRangeEnd === 'start' && !start) ||
      (currentlySelectingRangeEnd === 'end' && !end)
    ) {
      return;
    }

    scrollToDayIfNeeded(currentlySelectingRangeEnd === 'start' ? start : end);
  }, [currentlySelectingRangeEnd, date]); // eslint-disable-line

  const handleChange = React.useCallback(
    (newDate: MaterialUiPickersDate) => {
      const { nextSelection, newRange } = calculateRangeChange({
        newDate,
        utils,
        range: date,
        currentlySelectingRangeEnd,
      });

      setCurrentlySelectingRangeEnd(nextSelection);
      onDateChange(newRange, wrapperVariant, false);
    },
    [
      currentlySelectingRangeEnd,
      date,
      onDateChange,
      setCurrentlySelectingRangeEnd,
      utils,
      wrapperVariant,
    ]
  );

  switch (wrapperVariant) {
    case 'desktop': {
      return (
        <DesktopDateRangePicker
          calendars={calendars}
          {...calendarState}
          date={date}
          isDateDisabled={isDateDisabled}
          changeFocusedDay={changeFocusedDay}
          onChange={handleChange}
          reduceAnimations={reduceAnimations}
          disableHighlightToday={disableHighlightToday}
          onMonthSwitchingAnimationEnd={onMonthSwitchingAnimationEnd}
          changeMonth={changeMonth}
          currentlySelectingRangeEnd={currentlySelectingRangeEnd}
        />
      );
    }

    default: {
      throw new Error('Only desktop wrapper supported for DateRangePicker');
    }
  }
};
