import * as React from 'react';
import CalendarHeader from './CalendarHeader';
import { Calendar } from '../..';
import { CalendarProps } from './Calendar';
import { YearSelection } from './YearSelection';
import { makeStyles } from '@material-ui/styles';
import { MonthSelection } from './MonthSelection';
import { DatePickerView } from '../../DatePicker';
import { SlideDirection } from './SlideTransition';
import { useUtils } from '../../_shared/hooks/useUtils';
import { ParsableDate } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { CircularProgress, Grid } from '@material-ui/core';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { useParsedDate } from '../../_shared/hooks/useParsedDate';

export interface CalendarViewProps extends Omit<CalendarProps, 'minDate' | 'maxDate'> {
  date: MaterialUiPickersDate;
  view: DatePickerView;
  changeView: (nextView: DatePickerView) => void;
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** Min date @DateIOType */
  minDate?: ParsableDate;
  /** Max date */
  maxDate?: ParsableDate;
}

export type ExportedCalendarProps = Omit<
  CalendarViewProps,
  'date' | 'view' | 'onChange' | 'changeView' | 'slideDirection' | 'currentMonth'
>;

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

const useClasses = makeStyles({
  viewTransitionContainer: {
    overflowY: 'auto',
  },
  gridFullHeight: {
    flex: 1,
    height: '100%',
  },
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
  ...other
}) => {
  const utils = useUtils();
  const classes = useClasses();
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

  React.useEffect(() => {
    if (utils.isSameMonth(date, currentMonth)) {
      return;
    }

    handleChangeMonth({
      newMonth: utils.startOfMonth(date),
      direction: utils.isAfterDay(date, currentMonth) ? 'left' : 'right',
    });
  }, [date]); // eslint-disable-line

  return (
    <>
      <CalendarHeader
        {...other}
        view={view}
        month={currentMonth}
        changeView={() => changeView(view === 'date' ? 'year' : 'date')}
        onMonthChange={(newMonth, direction) => handleChangeMonth({ newMonth, direction })}
        minDate={minDate}
        maxDate={maxDate}
      />
      <FadeTransitionGroup className={classes.viewTransitionContainer} transKey={view}>
        <div>
          {view === 'year' && (
            <YearSelection
              {...other}
              date={date}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
            />
          )}

          {view === 'month' && (
            <MonthSelection
              {...other}
              date={date}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
            />
          )}

          {view === 'date' &&
            (loadingQueue > 0 ? (
              <Grid
                className={classes.gridFullHeight}
                container
                alignItems="center"
                justify="center"
              >
                {loadingIndicator}
              </Grid>
            ) : (
              <Calendar
                {...other}
                currentMonth={currentMonth}
                slideDirection={slideDirection}
                date={date}
                onChange={onChange}
                minDate={minDate}
                maxDate={maxDate}
              />
            ))}
        </div>
      </FadeTransitionGroup>
    </>
  );
};
