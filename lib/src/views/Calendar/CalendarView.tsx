import * as React from 'react';
import CalendarHeader from './CalendarHeader';
import { Calendar } from '../..';
import { YearSelection } from './YearSelection';
import { OuterCalendarProps } from './Calendar';
import { MonthSelection } from './MonthSelection';
import { DatePickerView } from '../../DatePicker';
import { SlideDirection } from './SlideTransition';
import { useUtils } from '../../_shared/hooks/useUtils';
import { ParsableDate } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { useParsedDate } from '../../_shared/hooks/useParsedDate';
import { CircularProgress, Grid, styled } from '@material-ui/core';

interface CalendarViewProps extends Omit<OuterCalendarProps, 'minDate' | 'maxDate'> {
  date: MaterialUiPickersDate;
  view: DatePickerView;
  changeView: (nextView: DatePickerView) => void;
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  minDate?: ParsableDate;
  maxDate?: ParsableDate;
}

export type ReducerAction<TType, TAdditional = {}> = { type: TType } & TAdditional;

interface ChangeMonthPayload {
  direction: SlideDirection;
  newMonth: MaterialUiPickersDate;
}

function calendarStateReducer(
  state: {
    loadingQueue: number;
    currentMonth: MaterialUiPickersDate;
    slideDirection: SlideDirection;
  },
  action:
    | ReducerAction<'popLoadingQueue'>
    | ReducerAction<'changeMonth', ChangeMonthPayload>
    | ReducerAction<'changeMonthLoading', ChangeMonthPayload>
) {
  switch (action.type) {
    case 'changeMonthLoading': {
      return {
        ...state,
        loadingQueue: state.loadingQueue + 1,
        slideDirection: action.direction,
        currentMonth: action.newMonth,
      };
    }
    case 'changeMonth': {
      return {
        ...state,
        slideDirection: action.direction,
        currentMonth: action.newMonth,
      };
    }
    case 'popLoadingQueue': {
      return {
        ...state,
        loadingQueue: state.loadingQueue <= 0 ? 0 : state.loadingQueue - 1,
      };
    }
  }
}

const GridFullHeight = styled(Grid)({
  flex: 1,
  height: '100%',
});

export const CalendarView: React.FC<CalendarViewProps> = ({
  date,
  view,
  onChange,
  changeView,
  onMonthChange,
  minDate: unparsedMinDate,
  maxDate: unparsedMaxDate,
  loadingIndicator = <CircularProgress />,
  ...rest
}) => {
  const utils = useUtils();
  const minDate = useParsedDate(unparsedMinDate);
  const maxDate = useParsedDate(unparsedMaxDate);

  const [{ currentMonth, loadingQueue, slideDirection }, dispatch] = React.useReducer(
    calendarStateReducer,
    {
      loadingQueue: 0,
      currentMonth: utils.startOfMonth(date),
      slideDirection: 'left',
    }
  );

  React.useEffect(() => {
    if (utils.isSameMonth(date, currentMonth)) {
      return;
    }

    dispatch({
      type: 'changeMonth',
      newMonth: utils.startOfMonth(date),
      direction: utils.isAfterDay(date, currentMonth) ? 'left' : 'right',
    });
  }, [date]); // eslint-disable-line

  const handleChangeMonth = (payload: ChangeMonthPayload) => {
    const returnedPromise = onMonthChange && onMonthChange(payload.newMonth);

    if (returnedPromise) {
      dispatch({
        type: 'changeMonthLoading',
        ...payload,
      });

      returnedPromise.then(() => dispatch({ type: 'popLoadingQueue' }));
    } else {
      dispatch({
        type: 'changeMonth',
        ...payload,
      });
    }
  };

  return (
    <>
      <CalendarHeader
        {...rest}
        view={view}
        month={currentMonth}
        changeView={() => changeView(view === 'date' ? 'year' : 'date')}
        onMonthChange={(newMonth, direction) => handleChangeMonth({ newMonth, direction })}
        minDate={minDate}
        maxDate={maxDate}
      />

      {view === 'year' && (
        <YearSelection
          {...rest}
          date={date}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}

      {view === 'month' && (
        <MonthSelection
          {...rest}
          date={date}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}

      {view === 'date' &&
        (loadingQueue > 0 ? (
          <GridFullHeight container alignItems="center" justify="center">
            {loadingIndicator}
          </GridFullHeight>
        ) : (
          <Calendar
            {...rest}
            currentMonth={currentMonth}
            slideDirection={slideDirection}
            date={date}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
          />
        ))}
    </>
  );
};
