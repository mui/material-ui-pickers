import * as React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import { DateInputProps } from '../_shared/PureDateInput';

interface MobileKeyboardInputViewProps extends DateInputProps {}

const useStyles = makeStyles(() => ({
  mobileKeyboardView: {
    padding: '16px 24px',
  },
}));

export const MobileKeyboardInputView: React.FC<MobileKeyboardInputViewProps> = ({ ...other }) => {
  const classes = useStyles();
  return (
    <div className={classes.mobileKeyboardView}>
      <KeyboardDateInput autoFocus fullWidth {...other} hideOpenPickerButton />
    </div>
  );
};
