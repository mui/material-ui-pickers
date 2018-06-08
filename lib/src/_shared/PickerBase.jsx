import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DomainPropTypes from '../constants/prop-types';

/* eslint-disable react/sort-comp */
/* eslint-disable react/require-default-props */
export default class PickerBase extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    format: PropTypes.string,
    labelFunc: PropTypes.func,
    ampm: PropTypes.bool,
    utils: PropTypes.object.isRequired,
  }

  getValidDateOrCurrent = (props = this.props) => {
    const {
      utils,
      value,
      minDate,
      maxDate,
    } = props;


    // value is selected, use this date if valid
    if (value != null) {
      return utils.isValid(value) ? utils.date(value) : utils.date();
    }
    // value is not selected so determine bounding date
    const today = utils.date();
    const minDateTDate = utils.date(minDate);
    const maxDateTDate = utils.date(maxDate);

    if (utils.isAfter(today, minDateTDate) && utils.isBefore(today, maxDateTDate)) {
      return today;
    }

    if (utils.isAfter(minDateTDate, today)) {
      return minDateTDate;
    }

    if (utils.isBefore(maxDateTDate, today)) {
      return maxDateTDate;
    }

    // should we even get here? If so, should we throw?
    return today;
  }

  state = {
    date: this.getValidDateOrCurrent(),
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.utils.isEqual(this.state.date, nextProps.value)) {
      this.setState({ date: this.getValidDateOrCurrent(nextProps) });
    }
  }

  getFormat = () => {
    if (this.props.format || this.props.labelFunc) {
      return this.props.format;
    }

    return this.props.ampm
      ? this.default12hFormat
      : this.default24hFormat;
  }

  getRef = (node) => { this.wrapper = node; }

  handleClear = () => {
    this.props.onChange(null);
  }

  handleAccept = () => {
    this.props.onChange(this.state.date);
  }

  handleDismiss = () => {
    this.setState({ date: this.getValidDateOrCurrent(this.props) });
  }

  handleChange = (date, isFinish = true) => {
    this.setState({ date }, () => {
      if (isFinish && this.props.autoOk) {
        this.handleAccept();
        this.wrapper.close();
      }
    });
  }

  handleTextFieldChange = (date) => {
    if (date === null) {
      this.handleClear();
    } else {
      this.setState({ date }, this.handleAccept);
    }
  }

  handleSetTodayDate = () => {
    this.handleChange(this.props.utils.date());
  }
}
