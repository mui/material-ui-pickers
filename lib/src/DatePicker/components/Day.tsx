import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme } from '@material-ui/core';

export interface DayProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  current?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
}

class Day extends React.PureComponent<DayProps> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    current: PropTypes.bool,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    selected: PropTypes.bool,
    innerRef: PropTypes.any
  }

  static defaultProps = {
    disabled: false,
    hidden: false,
    current: false,
    selected: false,
  }

  render() {
    const {
      children, classes, disabled, hidden, current, selected, ...other
    } = this.props;

    const className = classnames(classes.day, {
      [classes.hidden]: hidden,
      [classes.current]: current,
      [classes.selected]: selected,
      [classes.disabled]: disabled,
    });

    return (
      <IconButton
        className={className}
        tabIndex={hidden || disabled ? -1 : 0}
        {...other}
      >
        {children}
      </IconButton>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  current: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  selected: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.text.hint,
  },
});

export default withStyles(styles, { name: 'MuiPickersDay' })(Day as React.ComponentType<DayProps>);