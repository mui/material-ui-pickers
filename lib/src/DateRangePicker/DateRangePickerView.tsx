import * as React from 'react';
import { RangeInput, DateRange } from './RangeTypes';
import { MaterialUiPickersDate } from '../typings/date';
import { calculateRangeChange } from './date-range-manager';
import { useUtils, useNow } from '../_shared/hooks/useUtils';
import { SharedPickerProps } from '../Picker/SharedPickerProps';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
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
  open: boolean;
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}

export const DateRangePickerView: React.FC<DateRangePickerViewProps> = ({
  open,
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
  ...other
}) => {
  const now = useNow();
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
    date: start || end || now,
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
    const displayingMonthRange = calendars - 1;
    const currentMonthNumber = utils.getMonth(calendarState.currentMonth);
    const requestedMonthNumber = utils.getMonth(day);

    if (
      requestedMonthNumber < currentMonthNumber ||
      requestedMonthNumber > currentMonthNumber + displayingMonthRange
    ) {
      const newMonth =
        currentlySelectingRangeEnd === 'start'
          ? start
          : // If need to focus end, scroll to the state when "end" is displaying in the last calendar
            utils.addMonths(end, -displayingMonthRange);

      changeMonth(newMonth);
    }
  };

  React.useEffect(() => {
    if (disableAutoMonthSwitching || !open) {
      return;
    }

    if (
      (currentlySelectingRangeEnd === 'start' && start === null) ||
      (currentlySelectingRangeEnd === 'end' && end === null)
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
          date={date}
          isDateDisabled={isDateDisabled}
          changeFocusedDay={changeFocusedDay}
          onChange={handleChange}
          reduceAnimations={reduceAnimations}
          disableHighlightToday={disableHighlightToday}
          onMonthSwitchingAnimationEnd={onMonthSwitchingAnimationEnd}
          changeMonth={changeMonth}
          currentlySelectingRangeEnd={currentlySelectingRangeEnd}
          disableFuture={disableFuture}
          disablePast={disablePast}
          minDate={minDate}
          maxDate={maxDate}
          {...calendarState}
          {...other}
        />
      );
    }

    default: {
      throw new Error('Only desktop wrapper supported for DateRangePicker');
    }
  }
};
