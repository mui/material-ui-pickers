import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { withUtils, WithUtilsProps } from '../_shared/WithUtils';
import DatePickerView from '../constants/DatePickerView';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import Calendar, { RenderDay } from './components/Calendar';
import MonthSelection from './components/MonthSelection';
import YearSelection from './components/YearSelection';

export interface BaseDatePickerProps {
  /** Min selectable date */
  minDate?: DateType;
  /** Max selectable date */
  maxDate?: DateType;
  /** Disable past dates */
  disablePast?: boolean;
  /** Disable future dates */
  disableFuture?: boolean;
  /** To animate scrolling to current year (with scrollIntoView) */
  animateYearScrolling?: boolean;
  /** Initial view to show when date picker is open */
  openTo?: DatePickerView;
  /** @deprecated use openTo instead */
  openToYearSelection?: boolean;
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Custom renderer for day */
  renderDay?: RenderDay;
  /** Enables keyboard listener for moving between days in calendar */
  allowKeyboardControl?: boolean;
  /** Disable specific date */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
  initialFocusedDate?: DateType;
  /** Disable month and day selection */
  year?: boolean;
  /** Disable day selection */
  month?: boolean;
}

export interface DatePickerProps extends BaseDatePickerProps, WithStyles<typeof styles> {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

interface DatePickerState {
  openView: DatePickerView;
}

export class DatePicker extends React.PureComponent<DatePickerProps & WithUtilsProps> {
  public static propTypes = {
    openToYearSelection: PropTypes.bool,
  };

  public static defaultProps = {
    minDate: new Date('1900-01-01'),
    maxDate: new Date('2100-01-01'),
    openToYearSelection: false,
    year: false,
    month: false,
  };

  public state: DatePickerState = {
    openView:
      this.props.openTo ||
      (Boolean(this.props.openToYearSelection || this.props.year)
        ? DatePickerView.YEAR
        : this.props.month
          ? DatePickerView.MONTH
          : DatePickerView.DAY),
  };

  get date() {
    return this.props.date;
  }

  get minDate() {
    return this.props.utils.date(this.props.minDate);
  }

  get maxDate() {
    return this.props.utils.date(this.props.maxDate);
  }

  public handleYearSelect = (date: MaterialUiPickersDate) => {
    const { onChange, year, month } = this.props;
    onChange(date, year);

    if (year) {
      return;
    }

    if (month) {
      return this.openMonthSelection();
    }

    this.openCalendar();
  };

  public handleMonthSelect = (date: MaterialUiPickersDate) => {
    this.props.onChange(date, true);
  };

  public openYearSelection = () => {
    this.setState({ openView: DatePickerView.YEAR });
  };

  public openCalendar = () => {
    this.setState({ openView: DatePickerView.DAY });
  };

  public openMonthSelection = () => {
    this.setState({ openView: DatePickerView.MONTH });
  };

  public render() {
    const { openView } = this.state;
    const {
      disablePast,
      disableFuture,
      onChange,
      animateYearScrolling,
      leftArrowIcon,
      rightArrowIcon,
      renderDay,
      utils,
      shouldDisableDate,
      allowKeyboardControl,
      year,
      month,
      classes,
    } = this.props;

    return (
      <>
        <PickerToolbar className={clsx({ [classes.toolbarCenter]: year })}>
          <ToolbarButton
            variant={year ? 'h3' : 'subtitle1'}
            onClick={year ? undefined : this.openYearSelection}
            selected={openView === DatePickerView.YEAR}
            label={utils.getYearText(this.date)}
          />

          {!year &&
            !month && (
              <ToolbarButton
                variant="h4"
                onClick={this.openCalendar}
                selected={openView === DatePickerView.DAY}
                label={utils.getDatePickerHeaderText(this.date)}
              />
            )}

          {month && (
            <ToolbarButton
              variant="h4"
              onClick={this.openMonthSelection}
              selected={openView === DatePickerView.MONTH}
              label={utils.format(this.date, 'MMMM')} // Add getMonthText to utils
            />
          )}
        </PickerToolbar>

        {this.props.children}

        {openView === DatePickerView.YEAR && (
          <YearSelection
            date={this.date}
            onChange={this.handleYearSelect}
            minDate={this.minDate}
            maxDate={this.maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
            animateYearScrolling={animateYearScrolling}
          />
        )}
        {openView === DatePickerView.MONTH && (
          <MonthSelection
            date={this.date}
            onChange={this.handleMonthSelect}
            minDate={this.minDate}
            maxDate={this.maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
          />
        )}
        {openView === DatePickerView.DAY && (
          <Calendar
            date={this.date}
            onChange={onChange}
            disablePast={disablePast}
            disableFuture={disableFuture}
            minDate={this.minDate}
            maxDate={this.maxDate}
            leftArrowIcon={leftArrowIcon}
            rightArrowIcon={rightArrowIcon}
            renderDay={renderDay}
            shouldDisableDate={shouldDisableDate}
            allowKeyboardControl={allowKeyboardControl}
          />
        )}
      </>
    );
  }
}

export const styles = () =>
  createStyles({
    toolbarCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default withStyles(styles)(withUtils()(DatePicker));
