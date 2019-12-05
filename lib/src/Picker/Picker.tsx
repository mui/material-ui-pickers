import * as React from 'react';
import clsx from 'clsx';
import { useViews } from '../_shared/hooks/useViews';
import { ClockView } from '../views/Clock/ClockView';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePickerView } from '../DateTimePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { CalendarView } from '../views/Calendar/CalendarView';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { useIsLandscape } from '../_shared/hooks/useIsLandscape';
import { datePickerDefaultProps } from '../constants/prop-types';
import { DIALOG_WIDTH_WIDER, DIALOG_WIDTH, VIEW_HEIGHT } from '../constants/dimensions';

export type PickerView = DateTimePickerView;

export type ToolbarComponentProps = BaseDatePickerProps &
  BaseTimePickerProps & {
    views: PickerView[];
    openView: PickerView;
    date: MaterialUiPickersDate;
    setOpenView: (view: PickerView) => void;
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    title?: string;
    // TODO move out, cause it is DateTimePickerOnly
    hideTabs?: boolean;
    dateRangeIcon?: React.ReactNode;
    timeIcon?: React.ReactNode;
    isLandscape: boolean;
  };

export interface PickerViewProps extends BaseDatePickerProps, BaseTimePickerProps {
  views: PickerView[];
  openTo: PickerView;
  disableToolbar?: boolean;
  ToolbarComponent: React.ComponentType<ToolbarComponentProps>;
  // TODO move out, cause it is DateTimePickerOnly
  hideTabs?: boolean;
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
}

interface PickerProps extends PickerViewProps {
  date: MaterialUiPickersDate;
  orientation?: BasePickerProps['orientation'];
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

const useStyles = makeStyles(
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
      minHeight: VIEW_HEIGHT,
      minWidth: DIALOG_WIDTH,
      maxWidth: DIALOG_WIDTH_WIDER,
      display: 'flex',
      flexDirection: 'column',
    },
    pickerViewLandscape: {
      padding: '0 8px',
    },
  },
  { name: 'MuiPickersBasePicker' }
);

export const Picker: React.FunctionComponent<PickerProps> = ({
  date,
  views,
  disableToolbar,
  onChange,
  openTo,
  ToolbarComponent,
  orientation,
  ...rest
}) => {
  const classes = useStyles();
  const isLandscape = useIsLandscape(orientation);
  const { openView, setOpenView, handleChangeAndOpenNext } = useViews(views, openTo, onChange);

  return (
    <div
      className={clsx(classes.container, {
        [classes.containerLandscape]: isLandscape,
      })}
    >
      {!disableToolbar && (
        <ToolbarComponent
          {...rest}
          views={views}
          isLandscape={isLandscape}
          date={date}
          onChange={onChange}
          setOpenView={setOpenView}
          openView={openView}
        />
      )}

      <div className={clsx(classes.pickerView, { [classes.pickerViewLandscape]: isLandscape })}>
        {(openView === 'year' || openView === 'month' || openView === 'date') && (
          <CalendarView
            date={date}
            changeView={setOpenView}
            onChange={handleChangeAndOpenNext}
            view={openView}
            {...rest}
          />
        )}

        {(openView === 'hours' || openView === 'minutes' || openView === 'seconds') && (
          <ClockView
            {...rest}
            date={date}
            type={openView}
            onHourChange={handleChangeAndOpenNext}
            onMinutesChange={handleChangeAndOpenNext}
            onSecondsChange={handleChangeAndOpenNext}
          />
        )}
      </div>
    </div>
  );
};

Picker.defaultProps = {
  ...datePickerDefaultProps,
};
