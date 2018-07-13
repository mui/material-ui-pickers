import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import EventListener from 'react-event-listener';
import keycode from 'keycode';
import CalendarHeader from './CalendarHeader';
import DomainPropTypes from '../constants/prop-types';
import DayWrapper from './DayWrapper';
import Day from './Day';
import withUtils from '../_shared/WithUtils';
import { findClosestEnabledDate } from '../_helpers/date-utils';

/* eslint-disable no-unused-expressions */
export class Calendar extends Component {
  static propTypes = {
    date: DomainPropTypes.dateRange.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    theme: PropTypes.object.isRequired,
    shouldDisableDate: PropTypes.func,
    utils: PropTypes.object.isRequired,
    allowKeyboardControl: PropTypes.bool,
    multi: PropTypes.bool,
    range: PropTypes.bool,
  };

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disablePast: false,
    disableFuture: false,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    allowKeyboardControl: false,
    shouldDisableDate: () => false,
    multi: false,
    range: false,
  };

  state = {
    currentMonth: this.props.utils.getStartOfMonth(
      this.props.date.length > 0 ? this.props.date[this.props.date.length - 1] : this.props.utils.date()),
  };

  static getDerivedStateFromProps(nextProps, state) {
    if (!nextProps.utils.isEqual(nextProps.date, state.lastDate)) {
      return {
        lastDate: nextProps.date,
        currentMonth: nextProps.utils.getStartOfMonth(
          nextProps.date.length > 0 ? nextProps.date[nextProps.date.length - 1] : nextProps.utils.date()),
      };
    }

    return null;
  }

  componentDidMount() {
    const {
      date, minDate, maxDate, utils, disableFuture, disablePast,
    } = this.props;

    date.forEach(day =>
      this.shouldDisableDate(day) &&
      this.onDateSelect(findClosestEnabledDate({
        day,
        utils,
        minDate,
        maxDate,
        disablePast,
        disableFuture,
        shouldDisableDate: this.shouldDisableDate,
      }), false)
    );
  }

  onDateSelect = (day, isFinish = true) => {
    const { date, utils, multi, range } = this.props;

    let newDate = day
    if (date.length > 0) {
      newDate = utils.setHours(day, utils.getHours(date[0]));
      newDate = utils.setMinutes(newDate, utils.getMinutes(date[0]));
    }

    if (multi) {
      let i = date.findIndex(o => utils.isEqual(o, day))
      if (i === -1) {
        newDate = date.concat(newDate)
      } else {
        newDate = [ ...date ]
        newDate.splice(i, 1)
      }
    } else if (range && date.length === 1) {
      newDate = utils.isAfter(newDate, date[0])
        ? [ date[0], newDate ]
        : [ newDate, date[0] ];
    } else {
      newDate = [ newDate ]
    }

    this.props.onChange(newDate, isFinish);
  };

  handleChangeMonth = (newMonth) => {
    this.setState({ currentMonth: newMonth });
  };

  validateMinMaxDate = (day) => {
    const { minDate, maxDate, utils } = this.props;

    return (
      (minDate && utils.isBeforeDay(day, utils.date(minDate))) ||
      (maxDate && utils.isAfterDay(day, utils.date(maxDate)))
    );
  };

  shouldDisablePrevMonth = () => {
    const { utils, disablePast, minDate } = this.props;
    const now = utils.date();
    return !utils.isBefore(
      utils.getStartOfMonth(disablePast && utils.isAfter(now, minDate)
        ? now
        : utils.date(minDate)),
      this.state.currentMonth,
    );
  };

  shouldDisableNextMonth = () => {
    const { utils, disableFuture, maxDate } = this.props;
    const now = utils.date();
    return !utils.isAfter(
      utils.getStartOfMonth(disableFuture && utils.isBefore(now, maxDate)
        ? now
        : utils.date(maxDate)),
      this.state.currentMonth,
    );
  };

  shouldDisableDate = (day) => {
    const {
      disablePast, disableFuture, shouldDisableDate, utils,
    } = this.props;

    return (
      (disableFuture && utils.isAfterDay(day, utils.date())) ||
      (disablePast && utils.isBeforeDay(day, utils.date())) ||
      this.validateMinMaxDate(day) ||
      shouldDisableDate(day)
    );
  };

  moveToDay = (day) => {
    if (day && !this.shouldDisableDate(day)) {
      this.props.onChange(day);
    }
  }

  handleKeyDown = (event) => {
    const { theme, date, utils } = this.props;

    switch (keycode(event)) {
      case 'up':
        this.moveToDay(utils.addDays(date, -7));
        break;
      case 'down':
        this.moveToDay(utils.addDays(date, 7));
        break;
      case 'left':
        theme.direction === 'ltr'
          ? this.moveToDay(utils.addDays(date, -1))
          : this.moveToDay(utils.addDays(date, 1));
        break;
      case 'right':
        theme.direction === 'ltr'
          ? this.moveToDay(utils.addDays(date, 1))
          : this.moveToDay(utils.addDays(date, -1));
        break;
      default:
        // if keycode is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects (e.g. page scroll)
    event.preventDefault();
  };

  renderWeeks = () => {
    const { utils } = this.props;
    const { currentMonth } = this.state;
    const weeks = utils.getWeekArray(currentMonth);

    return weeks.map(week => (
      <div
        key={`week-${week[0].toString()}`}
        className={this.props.classes.week}
      >
        {this.renderDays(week)}
      </div>
    ));
  }

  renderDays = (week) => {
    const { date, renderDay, utils, range } = this.props;
    const { hover } = this.state;

    const selectedDate = date.map(utils.startOfDay);
    const currentMonthNumber = utils.getMonth(this.state.currentMonth);
    const now = utils.date();

    return week.map((day) => {
      const disabled = this.shouldDisableDate(day);
      const dayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

      let additionalProps;

      if (range) {
        additionalProps = {
          prelighted: date.length === 1 && utils.isBetween(day, date[0], hover),
          highlighted: date.length > 1 && utils.isBetween(day, date[0], date[1]),
          leftCap: utils.isEqual(day, Math.min(date[0], date[1] || hover)),
          rightCap: utils.isEqual(day, Math.max(date[0], date[1] || hover)),
        }
      }

      let dayComponent = (
        <Day
          current={utils.isSameDay(day, now)}
          hidden={!dayInCurrentMonth}
          disabled={disabled}
          selected={selectedDate.some(o => utils.isSameDay(o, day))}
          {...additionalProps}
        >
          {utils.getDayText(day)}
        </Day>
      );

      if (renderDay) {
        dayComponent = renderDay(day, selectedDate, dayInCurrentMonth, dayComponent);
      }

      return (
        <DayWrapper
          key={day.toString()}
          value={day}
          dayInCurrentMonth={dayInCurrentMonth}
          disabled={disabled}
          onSelect={this.onDateSelect}
          onMouseEnter={e => this.setState({ hover: day })}
        >
          {dayComponent}
        </DayWrapper>
      );
    });
  };

  render() {
    const { currentMonth } = this.state;
    const { classes, utils, allowKeyboardControl } = this.props;

    return (
      <Fragment>
        {
          allowKeyboardControl &&
          <EventListener target="window" onKeyDown={this.handleKeyDown} />
        }

        <CalendarHeader
          currentMonth={currentMonth}
          onMonthChange={this.handleChangeMonth}
          leftArrowIcon={this.props.leftArrowIcon}
          rightArrowIcon={this.props.rightArrowIcon}
          disablePrevMonth={this.shouldDisablePrevMonth()}
          disableNextMonth={this.shouldDisableNextMonth()}
          utils={utils}
        />

        <div
          autoFocus /* eslint-disable-line */ // Autofocus required for getting work keyboard navigation feature
          className={classes.calendar}
        >
          {this.renderWeeks()}
        </div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  calendar: {
    height: 36 * 6,
    marginTop: theme.spacing.unit * 1.5,
  },
  week: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default withStyles(styles, {
  name: 'MuiPickersCalendar',
  withTheme: true,
})(withUtils()(Calendar));
