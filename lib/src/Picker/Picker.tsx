import * as React from 'react';
import clsx from 'clsx';
import { useViews } from '../_shared/hooks/useViews';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePickerView } from '../DateTimePicker';
import { WithViewsProps } from './makePickerWithState';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { CalendarView } from '../views/Calendar/CalendarView';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { useIsLandscape } from '../_shared/hooks/useIsLandscape';
import { DIALOG_WIDTH, VIEW_HEIGHT } from '../constants/dimensions';
import { ClockView, BaseClockViewProps } from '../views/Clock/ClockView';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';

export type PickerView = DateTimePickerView;

export type ToolbarComponentProps<T extends PickerView = any> = BaseDatePickerProps &
  BaseClockViewProps & {
    views: T[];
    openView: T;
    date: MaterialUiPickersDate;
    setOpenView: (view: T) => void;
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    title?: string;
    // TODO move out, cause it is DateTimePickerOnly
    hideTabs?: boolean;
    dateRangeIcon?: React.ReactNode;
    timeIcon?: React.ReactNode;
    isLandscape: boolean;
    ampmInClock?: boolean;
  };

export interface PickerViewProps<TView extends PickerView>
  extends Omit<BasePickerProps, 'value' | 'onChange'>,
    WithViewsProps<TView>,
    BaseDatePickerProps,
    BaseClockViewProps {
  title?: string;
  disableToolbar?: boolean;
  ToolbarComponent: React.ComponentType<ToolbarComponentProps<any>>;
  // TODO move out, cause it is DateTimePickerOnly
  hideTabs?: boolean;
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
}

interface PickerProps<T extends PickerView> extends PickerViewProps<T> {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

export const useStyles = makeStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    containerLandscape: {
      flexDirection: 'row',
    },
    pickerView: {
      overflowX: 'hidden',
      width: DIALOG_WIDTH,
      maxHeight: VIEW_HEIGHT,
      minHeight: VIEW_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
    },
    pickerViewLandscape: {
      padding: '0 8px',
    },
  },
  { name: 'MuiPickersBasePicker' }
);

export function Picker<T extends PickerView>({
  date,
  // @ts-ignore
  openTo = 'date',
  // @ts-ignore
  views = ['year', 'month', 'date', 'hours', 'minutes', 'seconds'],
  title,
  disableToolbar,
  onChange,
  ToolbarComponent,
  orientation,
  ...other
}: PickerProps<T>) {
  const classes = useStyles();
  const isLandscape = useIsLandscape(views, orientation);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const { openView, setOpenView, handleChangeAndOpenNext } = useViews(views, openTo, onChange);

  return (
    <div
      className={clsx(classes.container, {
        [classes.containerLandscape]: isLandscape,
      })}
    >
      {wrapperVariant !== 'desktop' && !disableToolbar && (
        <ToolbarComponent
          {...other}
          views={views}
          isLandscape={isLandscape}
          date={date}
          onChange={onChange}
          setOpenView={setOpenView}
          openView={openView}
          title={title}
          ampmInClock={other.ampmInClock}
        />
      )}

      <div className={clsx(classes.pickerView, { [classes.pickerViewLandscape]: isLandscape })}>
        {(openView === 'year' || openView === 'month' || openView === 'date') && (
          <CalendarView
            date={date}
            changeView={setOpenView}
            // @ts-ignore
            views={views}
            onChange={handleChangeAndOpenNext}
            view={openView}
            {...other}
          />
        )}

        {(openView === 'hours' || openView === 'minutes' || openView === 'seconds') && (
          <ClockView
            {...other}
            date={date}
            type={openView}
            onDateChange={onChange}
            onHourChange={handleChangeAndOpenNext}
            onMinutesChange={handleChangeAndOpenNext}
            onSecondsChange={handleChangeAndOpenNext}
          />
        )}
      </div>
    </div>
  );
}
