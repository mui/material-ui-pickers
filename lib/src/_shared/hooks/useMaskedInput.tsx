import * as React from 'react';
import { useRifm } from 'rifm';
import { useUtils } from './useUtils';
import { DateInputProps } from '../PureDateInput';
import { createDelegatedEventHandler } from '../../_helpers/utils';
import {
  maskedDateFormatter,
  getDisplayDate,
  checkMaskIsValidForCurrentFormat,
} from '../../_helpers/text-field-helper';

type MaskedInputProps = Omit<
  DateInputProps,
  | 'open'
  | 'adornmentPosition'
  | 'renderInput'
  | 'openPicker'
  | 'InputProps'
  | 'InputAdornmentProps'
  | 'openPickerIcon'
  | 'disableOpenPicker'
  | 'getOpenDialogAriaText'
  | 'OpenPickerButtonProps'
>;

export function useMaskedInput({
  disableMaskedInput,
  rawValue,
  validationError,
  onChange,
  mask,
  acceptRegex = /[\d]/gi,
  inputFormat,
  disabled,
  rifmFormatter,
  emptyInputText: emptyLabel,
  ignoreInvalidInputs,
  readOnly,
  TextFieldProps,
  label,
}: MaskedInputProps) {
  const utils = useUtils();
  const isFocusedRef = React.useRef(false);

  const getInputValue = React.useCallback(
    () =>
      getDisplayDate(rawValue, utils, {
        inputFormat,
        emptyInputText: emptyLabel,
      }),
    [emptyLabel, inputFormat, rawValue, utils]
  );

  const formatHelperText = utils.getFormatHelperText(inputFormat);
  const [innerInputValue, setInnerInputValue] = React.useState<string | null>(getInputValue());

  const shouldUseMaskedInput = React.useMemo(() => {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return checkMaskIsValidForCurrentFormat(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);

  const formatter = React.useMemo(
    () =>
      shouldUseMaskedInput && mask ? maskedDateFormatter(mask, acceptRegex) : (st: string) => st,
    [acceptRegex, mask, shouldUseMaskedInput]
  );

  React.useEffect(() => {
    // We do not need to update the input value on keystroke
    // Because library formatters can change inputs from 12/12/2 to 12/12/0002
    if ((rawValue === null || utils.isValid(rawValue)) && !isFocusedRef.current) {
      setInnerInputValue(getInputValue());
    }
  }, [utils, getInputValue, rawValue]);

  const handleChange = (text: string) => {
    const finalString = text === '' || text === mask ? null : text;
    setInnerInputValue(finalString);

    const date = finalString === null ? null : utils.parse(finalString, inputFormat);
    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  const rifmProps = useRifm({
    value: innerInputValue || '',
    onChange: handleChange,
    format: rifmFormatter || formatter,
  });

  return {
    ...(shouldUseMaskedInput ? rifmProps : {}),
    label,
    disabled,
    type: shouldUseMaskedInput ? 'tel' : 'text',
    placeholder: formatHelperText,
    error: Boolean(validationError),
    helperText: formatHelperText || validationError,
    'data-mui-test': 'keyboard-date-input',
    inputProps: { readOnly },
    ...TextFieldProps,
    onFocus: createDelegatedEventHandler(
      () => (isFocusedRef.current = true),
      TextFieldProps?.onFocus
    ),
    onBlur: createDelegatedEventHandler(
      () => (isFocusedRef.current = false),
      TextFieldProps?.onBlur
    ),
  };
}
