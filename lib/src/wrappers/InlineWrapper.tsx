import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Popover, {
  PopoverProps as PopoverPropsType,
} from '@material-ui/core/Popover';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import EventListener from 'react-event-listener';
import DateTextField, { DateTextFieldProps } from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export interface OuterInlineWrapperProps extends Partial<DateTextFieldProps> {
  onOpen?: () => void;
  onClose?: () => void;
  onSetToday?: () => void;
  showTodayButton?: boolean;
  clearLabel?: React.ReactNode;
  todayLabel?: React.ReactNode;
  PopoverProps?: Partial<PopoverPropsType>;
}

export interface InlineWrapperProps extends OuterInlineWrapperProps {
  handleAccept: () => void;
  isAccepted: boolean;
  onlyCalendar: boolean;
}

export class InlineWrapper extends React.PureComponent<
  InlineWrapperProps & WithStyles<typeof styles>
> {
  public static propTypes: any = {
    /** Show only calendar for datepicker in popover mode */
    onlyCalendar: PropTypes.bool,
    /** Picker value */
    value: DomainPropTypes.date,
    /** On open callback [(e: Event) => void] */
    onOpen: PropTypes.func,
    /** On close callback [(e: Event) => void] */
    onClose: PropTypes.func,
    /** Format string */
    format: PropTypes.string,
    /** Dialog props passed to material-ui Dialog */
    PopoverProps: PropTypes.object,
    labelFunc: PropTypes.func,
    onClear: PropTypes.func,
    isAccepted: PropTypes.bool,
    handleAccept: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    keyboard: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    innerRef: PropTypes.any,
    showTodayButton: PropTypes.bool,
    clearLabel: PropTypes.node.isRequired,
    clearable: PropTypes.bool.isRequired,
    todayLabel: PropTypes.node.isRequired,
    onSetToday: PropTypes.func.isRequired,
  };

  public static defaultProps = {
    value: new Date(),
    labelFunc: undefined,
    onlyCalendar: false,
    format: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
    PopoverProps: undefined,
    isAccepted: false,
    keyboard: undefined,
    showTodayButton: false,
    clearable: false,
    clearLabel: 'Clear',
    todayLabel: 'Today',
  };

  public static getDerivedStateFromProps(nextProps: InlineWrapperProps) {
    // only if accept = true close the popover
    if (nextProps.isAccepted) {
      return {
        anchorEl: null,
      };
    }

    return null;
  }

  public state = {
    anchorEl: null,
  };

  public open = (e: React.SyntheticEvent) => {
    this.setState({ anchorEl: e.currentTarget });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  public close = () => {
    this.setState({ anchorEl: null });
    this.props.handleAccept();
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  public handleKeyDown = (event: Event) => {
    switch (keycode(event)) {
      case 'enter': {
        this.props.handleAccept();
        this.close();
        break;
      }
      default:
        // if keycode is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects
    event.preventDefault();
  };

  public handleSetTodayDate = () => {
    if (this.props.onSetToday) {
      this.props.onSetToday();
    }
  };

  public handleClear = () => {
    this.close();
    if (this.props.onClear) {
      this.props.onClear();
    }
  };

  public render() {
    const {
      value,
      format,
      children,
      onOpen,
      onClose,
      PopoverProps,
      isAccepted,
      keyboard,
      onlyCalendar,
      classes,
      handleAccept,
      showTodayButton,
      clearable,
      clearLabel,
      todayLabel,
      onSetToday,
      ...other
    } = this.props;

    const isOpen = Boolean(this.state.anchorEl);

    return (
      <React.Fragment>
        {isOpen && (
          <EventListener target="window" onKeyDown={this.handleKeyDown} />
        )}

        <DateTextField
          value={value}
          format={format}
          onClick={this.open}
          keyboard={keyboard}
          {...other}
        />

        <Popover
          id="picker-popover"
          open={isOpen}
          anchorEl={this.state.anchorEl}
          onClose={this.close}
          classes={{
            paper: classes.popoverPaper,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: keyboard ? 'right' : 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: keyboard ? 'right' : 'center',
          }}
          {...PopoverProps}
        >
          <React.Fragment>
            {children}

            <DialogActions
              classes={{
                root:
                  clearable || showTodayButton
                    ? classes.dialogActions
                    : undefined,
                action: classnames(classes.dialogAction, {
                  [classes.clearableDialogAction]: clearable,
                  [classes.todayDialogAction]: !clearable && showTodayButton,
                }),
              }}
            >
              {clearable && (
                <Button color="primary" onClick={this.handleClear}>
                  {clearLabel}
                </Button>
              )}

              {!clearable &&
                showTodayButton && (
                  <Button color="primary" onClick={this.handleSetTodayDate}>
                    {todayLabel}
                  </Button>
                )}
            </DialogActions>
          </React.Fragment>
        </Popover>
      </React.Fragment>
    );
  }
}

const styles = {
  popoverPaper: {
    maxWidth: 310,
    minWidth: 290,
  },
  dialogActions: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
  },
  dialogAction: {
    // empty but may be needed for override
  },
  clearableDialogAction: {
    '&:first-child': {
      marginRight: 'auto',
    },
  },
  todayDialogAction: {
    '&:first-child': {
      marginRight: 'auto',
    },
  },
};

// @ts-ignore
export default withStyles(styles)(InlineWrapper);
