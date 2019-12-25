import * as React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import InputAdornment, { InputAdornmentProps } from '@material-ui/core/InputAdornment';
import { Rifm } from 'rifm';
import { useUtils } from './hooks/useUtils';
import { ExtendMui } from '../typings/extendMui';
import { KeyboardIcon } from './icons/KeyboardIcon';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { makeMaskFromFormat, maskedDateFormatter } from '../_helpers/text-field-helper';

export interface KeyboardDateInputProps
  extends ExtendMui<TextFieldProps, 'variant' | 'onError' | 'onChange' | 'value'> {
  rawValue: ParsableDate;
  format: string;
  onChange: (date: MaterialUiPickersDate, isFinish: boolean) => void;
  openPicker: () => void;
  validationError?: React.ReactNode;
  inputValue: string;
  inputProps?: TextFieldProps['inputProps'];
  InputProps?: TextFieldProps['InputProps'];
  /** Override input component */
  TextFieldComponent?: React.ComponentType<TextFieldProps>;
  /** Icon displaying for open picker button */
  keyboardIcon?: React.ReactNode;
  /** Pass material-ui text field variant down, bypass internal variant prop */
  inputVariant?: TextFieldProps['variant'];
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

export const KeyboardDateInput: React.FunctionComponent<KeyboardDateInputProps> = ({
  rawValue,
  inputValue,
  inputVariant,
  validationError,
  KeyboardButtonProps,
  InputAdornmentProps,
  openPicker: onOpen,
  onChange,
  InputProps,
  mask,
  maskChar = '_',
  refuse = /[^\d]+/gi,
  format,
  disabled,
  rifmFormatter,
  TextFieldComponent = TextField,
  keyboardIcon = <KeyboardIcon />,
  ...other
}) => {
  const utils = useUtils();
  const [innerInputValue, setInnerInputValue] = React.useState<string | null>(inputValue || '');
  const inputMask = mask || makeMaskFromFormat(format, maskChar);
  // prettier-ignore
  const formatter = React.useMemo(
    () => maskedDateFormatter(inputMask, maskChar, refuse),
    [inputMask, maskChar, refuse]
  );

  React.useEffect(() => {
    if (rawValue === null || utils.isValid(rawValue)) {
      setInnerInputValue(inputValue);
    }
  }, [rawValue]); // eslint-disable-line

  const position =
    InputAdornmentProps && InputAdornmentProps.position ? InputAdornmentProps.position : 'end';

  const handleChange = (text: string) => {
    const finalString = text === '' || text === inputMask ? null : text;
    setInnerInputValue(finalString);

    const date = finalString === null ? null : utils.parse(finalString, format);
    onChange(date, false);
  };

  return (
    <Rifm
      key={inputMask}
      value={innerInputValue || ''}
      onChange={handleChange}
      refuse={refuse}
      format={rifmFormatter || formatter}
    >
      {({ onChange, value }) => (
        <TextFieldComponent
          disabled={disabled}
          error={Boolean(validationError)}
          helperText={validationError}
          {...other}
          value={value}
          onChange={onChange}
          variant={inputVariant as any}
          InputProps={{
            ...InputProps,
            [`${position}Adornment`]: (
              <InputAdornment position={position} {...InputAdornmentProps}>
                <IconButton disabled={disabled} {...KeyboardButtonProps} onClick={onOpen}>
                  {keyboardIcon}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </Rifm>
  );
};

export default KeyboardDateInput;
