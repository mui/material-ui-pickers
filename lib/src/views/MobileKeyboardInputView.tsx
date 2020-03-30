import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DateInputProps } from '../_shared/PureDateInput';
import { InnerMobileWrapperProps } from '../wrappers/MobileWrapper';

interface MobileKeyboardInputViewProps extends DateInputProps, Partial<InnerMobileWrapperProps> {
  DateInputComponent: React.FC<DateInputProps>;
}

const useStyles = makeStyles(() => ({
  mobileKeyboardView: {
    padding: '16px 24px',
  },
}));

export const MobileKeyboardInputView: React.FC<MobileKeyboardInputViewProps> = ({
  clearLabel,
  DialogProps,
  clearable,
  DateInputComponent,
  ...other
}) => {
  const classes = useStyles();
  return (
    <div className={classes.mobileKeyboardView}>
      <DateInputComponent autoFocus fullWidth {...other} disableOpenPicker ignoreInvalidInputs />
    </div>
  );
};
