import * as React from 'react';
import { useUtils, MuiPickersAdapter } from './useUtils';

export interface ValidationProps<TError, TDateValue> {
  /**
   * Callback that fired when input value or new `value` prop is disabled.
   * and `TextField` is displaying in `error` state. This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/form-integration) about form integration and error displaying.
   */
  onError?: (reason: TError | null, value: TDateValue) => void;
}

export function makeValidationHook<
  TError,
  TDateValue,
  TProps extends ValidationProps<TError, TDateValue>
>(validateFn: (utils: MuiPickersAdapter, value: TDateValue, props: TProps) => TError | null) {
  return (value: TDateValue, props: TProps) => {
    const utils = useUtils();
    const validationError = validateFn(utils, value, props);

    React.useEffect(() => {
      if (props.onError) {
        props.onError(validationError, value);
      }
    }, [props, validationError, value]);

    return validationError !== null;
  };
}
