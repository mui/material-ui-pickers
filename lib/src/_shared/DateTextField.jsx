import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';

import DomainPropTypes from '../constants/prop-types';
import MaskedInput from './MaskedInput';
import withUtils from '../_shared/WithUtils';

const getDisplayDate = (props) => {
  const {
    utils, format, invalidLabel, emptyLabel, labelFunc, formatSeperator
  } = props;
  const value = utils.ensureArray(props.value);

  const isEmpty = value.length < 1;
  const date = value.map(utils.date);

  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel);
  }

  if (isEmpty) {
    return emptyLabel;
  }

  return date.every(utils.isValid)
    ? date.map(o => utils.format(o, format)).join(formatSeperator)
    : invalidLabel;
};

const getError = (value, props) => {
  const {
    utils,
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
  } = props;

  if (!value.every(utils.isValid)) {
    // if null - do not show error
    if (value.every(utils.isNull)) {
      return '';
    }

    return invalidDateMessage;
  }

  let endOfDay = utils.endOfDay(utils.date())
  if (
    (maxDate && value.some(o => utils.isAfter(o, maxDate))) ||
    (disableFuture && value.some(o => utils.isAfter(o, endOfDay)))
  ) {
    return maxDateMessage;
  }

  let startOfDay = utils.startOfDay(utils.date())
  if (
    (minDate && value.some(o => utils.isBefore(o, minDate))) ||
    (disablePast && value.some(o => utils.isBefore(o, startOfDay)))
  ) {
    return minDateMessage;
  }

  return '';
};

export class DateTextField extends PureComponent {
  static updateState = props => ({
    value: props.utils.ensureArray(props.value),
    displayValue: getDisplayDate(props),
    error: getError(props.utils.ensureArray(props.value).map(props.utils.date), props),
  });

  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    value: DomainPropTypes.dateRange,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    format: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    clearable: PropTypes.bool,
    utils: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    InputProps: PropTypes.shape(),
    /** Input mask, used in keyboard mode read more <a href="https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme">here</a> */
    mask: PropTypes.any,
    /** Error message, shown if date is less then minimal date */
    minDateMessage: PropTypes.node,
    /** Error message, shown if date is more then maximal date */
    maxDateMessage: PropTypes.node,
    /** Message displaying in text field, if date is invalid (doesn't work in keyboard mode) */
    invalidLabel: PropTypes.string,
    /** Message displaying in text field, if null passed (doesn't work in keyboard mode) */
    emptyLabel: PropTypes.string,
    /** Dynamic label generation function (date, invalidLabel) => string */
    labelFunc: PropTypes.func,
    /** On/off manual keyboard input mode */
    keyboard: PropTypes.bool,
    /** Icon displayed for open picker button in keyboard mode */
    keyboardIcon: PropTypes.node,
    /** enables/disable automatic opening of the picker when the user clicks enter */
    disableOpenOnEnter: PropTypes.bool,
    /** Message, appearing when date cannot be parsed */
    invalidDateMessage: PropTypes.node,
    /** Component that should replace the default Material-UI TextField */
    TextFieldComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /** Props to pass to keyboard input adornment */
    InputAdornmentProps: PropTypes.object,
    /** Specifies position of keyboard button adornment */
    adornmentPosition: PropTypes.oneOf(['start', 'end']),
    /** Callback firing when date that applied in the keyboard is invalid  */
    onError: PropTypes.func,
    /** String to join multiple values **/
    formatSeperator: PropTypes.string,
    /** Callback firing on change input in keyboard mode */
    onInputChange: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    invalidLabel: 'Unknown',
    emptyLabel: '',
    value: [ new Date() ],
    labelFunc: undefined,
    format: undefined,
    InputProps: undefined,
    keyboard: false,
    mask: undefined,
    keyboardIcon: 'event',
    disableOpenOnEnter: false,
    invalidDateMessage: 'Invalid Date Format',
    clearable: false,
    onBlur: undefined,
    onClear: undefined,
    disablePast: false,
    disableFuture: false,
    onError: undefined,
    onInputChange: undefined,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    minDateMessage: 'Date should not be before minimal date',
    maxDateMessage: 'Date should not be after maximal date',
    TextFieldComponent: TextField,
    InputAdornmentProps: {},
    adornmentPosition: 'end',
    formatSeperator: ', ',
  }

  state = DateTextField.updateState(this.props)

  componentDidUpdate(prevProps) {
    if (
      !this.props.utils.isEqual(this.props.value, prevProps.value) ||
      prevProps.format !== this.props.format ||
      prevProps.maxDate !== this.props.maxDate ||
      prevProps.minDate !== this.props.minDate ||
      prevProps.emptyLabel !== this.props.emptyLabel ||
      prevProps.utils !== this.props.utils
    ) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      this.setState(DateTextField.updateState(this.props));
    }
  }

  commitUpdates = (value) => {
    const {
      clearable,
      onClear,
      utils,
      format,
      onError,
      formatSeperator,
    } = this.props;

    if (value === '') {
      if (this.props.value === null) {
        this.setState(DateTextField.updateState(this.props));
      } else if (clearable && onClear) {
        onClear();
      }

      return;
    }

    const oldValue = this.state.value.map(utils.date);
    const newValue = value.split(formatSeperator).map(o => utils.parse(o, format));
    const error = getError(newValue, this.props);

    this.setState({
      error,
      displayValue: value,
      value: error ? newValue : oldValue,
    }, () => {
      if (!error && !utils.isEqual(newValue, oldValue)) {
        this.props.onChange(newValue.length > 1 ? newValue : newValue[0]);
      }

      if (error && onError) {
        onError(newValue.length > 1 ? newValue : newValue[0], error);
      }
    });
  }

  handleBlur = (e) => {
    if (this.props.keyboard) {
      e.preventDefault();
      e.stopPropagation();

      this.commitUpdates(e.target.value);
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  };

  handleChange = (e) => {
    const { utils, format, formatSeperator, onInputChange, } = this.props;
    const parsedValue = e.target.value.split(formatSeperator).map(o => utils.parse(o, format));

    if (onInputChange) {
      onInputChange(e);
    }

    this.setState({
      displayValue: e.target.value,
      error: getError(parsedValue, this.props),
    });
  }

  handleFocus = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!this.props.keyboard) {
      this.openPicker(e);
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!this.props.disableOpenOnEnter) {
        this.openPicker(e);
      } else {
        this.commitUpdates(e.target.value);
      }
    }
  }

  openPicker = (e) => {
    const { disabled, onClick } = this.props;

    if (!disabled) {
      onClick(e);
    }
  }

  render() {
    const {
      adornmentPosition,
      classes,
      clearable,
      disabled,
      disableFuture,
      disableOpenOnEnter,
      disablePast,
      emptyLabel,
      format,
      InputAdornmentProps,
      InputProps,
      invalidDateMessage,
      invalidLabel,
      keyboard,
      keyboardIcon,
      labelFunc,
      mask,
      maxDate,
      maxDateMessage,
      minDate,
      minDateMessage,
      onBlur,
      onClear,
      onClick,
      TextFieldComponent,
      utils,
      value,
      formatSeperator,
      onInputChange,
      ...other
    } = this.props;

    const { displayValue, error } = this.state;
    const localInputProps = {
      className: classes.input,
      inputComponent: MaskedInput,
      inputProps: {
        mask: !keyboard ? null : mask,
        readOnly: !keyboard,
      },
    };

    if (keyboard) {
      localInputProps[`${adornmentPosition}Adornment`] = (
        <InputAdornment
          position={adornmentPosition}
          {...InputAdornmentProps}
        >
          <IconButton
            disabled={disabled}
            onClick={this.openPicker}
          >
            <Icon> {keyboardIcon} </Icon>
          </IconButton>
        </InputAdornment>
      );
    }

    return (
      <TextFieldComponent
        onClick={this.handleFocus}
        error={!!error}
        helperText={error}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
        disabled={disabled}
        value={displayValue}
        {...other}
        onChange={this.handleChange}
        InputProps={{ ...localInputProps, ...InputProps }}
      />
    );
  }
}

const styles = {
  input: {
    alignItems: 'flex-end',
  },
};

export default withStyles(styles)(withUtils()(DateTextField));
