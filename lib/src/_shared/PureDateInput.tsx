import * as React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/helpers';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { InputAdornmentProps } from '@material-ui/core/InputAdornment';

export type NotOverridableProps =
  | 'openPicker'
  | 'inputValue'
  | 'onChange'
  | 'format'
  | 'validationError'
  | 'format'
  | 'rawValue'
  | 'forwardedRef';

export interface DateInputProps
  extends ExtendMui<TextFieldProps, 'onError' | 'onChange' | 'value'> {
  rawValue: ParsableDate;
  format: string;
  onChange: (date: MaterialUiPickersDate | null, keyboardInputValue?: string) => void;
  openPicker: () => void;
  validationError?: React.ReactNode;
  inputValue: string;
  /** Override input component */
  TextFieldComponent?: React.ComponentType<TextFieldProps>;
  /** Icon displaying for open picker button */
  keyboardIcon?: React.ReactNode;
  /**
   * Custom mask. Can be used to override generate from format. (e.g. __/__/____ __:__)
   */
  mask?: string;
  /**
   * Char string that will be replaced with number (for "_" mask will be "__/__/____")
   * @default '_'
   */
  maskChar?: string;
  /**
   * Refuse values regexp
   * @default /[^\d]+/gi
   */
  refuse?: RegExp;
  /**
   * Props to pass to keyboard input adornment
   * @type {Partial<InputAdornmentProps>}
   */
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  /**
   * Props to pass to keyboard adornment button
   * @type {Partial<IconButtonProps>}
   */
  KeyboardButtonProps?: Partial<IconButtonProps>;
  /** Custom formatter to be passed into Rifm component */
  rifmFormatter?: (str: string) => string;
}

export type ExportedDateInputProps = Omit<DateInputProps, NotOverridableProps>;

export const PureDateInput: React.FC<DateInputProps> = ({
  onChange,
  format,
  rifmFormatter,
  refuse,
  mask,
  maskChar,
  inputValue,
  validationError,
  InputProps,
  openPicker: onOpen,
  TextFieldComponent = TextField,
  variant,
  ...other
}) => {
  const PureDateInputProps = React.useMemo(
    () => ({
      ...InputProps,
      readOnly: true,
    }),
    [InputProps]
  );

  return (
    <TextFieldComponent
      variant={variant as any}
      error={Boolean(validationError)}
      helperText={validationError}
      {...other}
      // do not overridable
      onClick={onOpen}
      value={inputValue}
      InputProps={PureDateInputProps}
      onKeyDown={e => {
        // space
        if (e.keyCode === 32) {
          e.stopPropagation();
          onOpen();
        }
      }}
    />
  );
};

PureDateInput.displayName = 'PureDateInput';
