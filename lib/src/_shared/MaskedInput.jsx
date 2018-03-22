import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

export default class Input extends PureComponent {
  static propTypes = {
    mask: PropTypes.any,
    value: PropTypes.string,
    inputRef: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mask: undefined,
    value: '',
  }

  componentDidUpdate() {
    const { value } = this.props;

    if (!value && this.input.inputElement) {
      this.input.inputElement.value = '';
    }
  }

  inputRef = (input) => {
    const { inputRef = () => {} } = this.props;

    inputRef(input);
    this.input = input;
  }

  render() {
    const { inputRef, ...props } = this.props;
    return (
      this.props.mask
        ? <MaskedInput {...props} ref={this.inputRef} />
        : <input {...props} ref={this.inputRef} />
    );
  }
}

