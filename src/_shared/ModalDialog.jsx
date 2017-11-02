import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Dialog, DialogActions, DialogContent, Button, withStyles } from 'material-ui';

const styles = {
  dialogRoot: {

  },
  dialog: {
    width: 300,
    height: 420,

    '&:first-child': {
      padding: 0,
    },
  },
};

const ModalDialog = (props) => {
  const {
    children, classes, onAccept, onDismiss, allowClear, onClear, dialogContentClassName, ...other
  } = props;

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} {...other}>
      <DialogContent className={classnames(classes.dialog, dialogContentClassName)}>
        { children }
      </DialogContent>

      <DialogActions>
        {allowClear && <Button color="primary" onClick={onClear} tabIndex={-1}> Clear </Button>}
        <Button color="primary" onClick={onDismiss} tabIndex={-1}> Cancel </Button>
        <Button color="primary" onClick={onAccept}> OK </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  allowClear: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  dialogContentClassName: PropTypes.string,
};

ModalDialog.defaultProps = {
  dialogContentClassName: '',
  allowClear: false,
  onClear: null,
};

export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
