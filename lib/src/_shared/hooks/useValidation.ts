import * as React from 'react';
import { useUtils, MuiPickersAdapter } from './useUtils';

export interface ValidationProps<TError, TDateValue> {
  /** Callback fired when new error should be displayed
   * (!! This is a side effect. Be careful if you want to rerender the component) @DateIOType
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
