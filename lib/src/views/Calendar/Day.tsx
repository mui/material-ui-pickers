import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { makeStyles, fade } from '@material-ui/core/styles';
import { ButtonBase, ButtonBaseProps } from '@material-ui/core';

export const useStyles = makeStyles(
  theme => ({
    day: {
      margin: '1px 2px',
      width: 36,
      height: 36,
      borderRadius: '50%',
      padding: 0,
      color: theme.palette.text.primary,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      '&:hover': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },
    current: {
      '&:not($daySelected)': {
        border: `1px solid ${theme.palette.text.hint}`,
      },
    },
    daySelected: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        willChange: 'background-color',
        backgroundColor: theme.palette.primary.light,
      },
    },
    dayDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint,
    },
    dayLabel: {
      // need for overrides
    },
  }),
  { name: 'MuiPickersDay' }
);

export interface DayProps extends ButtonBaseProps {
  /** The date to show */
  day: MaterialUiPickersDate;
  /** Is focused by keyboard navigation */
  focused: boolean;
  /** Is today? */
  current?: boolean;
  /** Disabled? */
  disabled?: boolean;
  /** Hidden? */
  hidden?: boolean;
  /** Selected? */
  selected?: boolean;
}

export const Day: React.FC<DayProps> = ({
  day,
  disabled,
  hidden,
  current,
  selected,
  focused,
  ...other
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const utils = useUtils();
  const classes = useStyles();
  const className = clsx(classes.day, {
    [classes.hidden]: hidden,
    [classes.current]: current,
    [classes.daySelected]: selected,
    [classes.dayDisabled]: disabled,
  });

  React.useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);

  return (
    <ButtonBase
      ref={ref}
      centerRipple
      focusRipple
      data-mui-test="day"
      aria-label={utils.format(day, 'fullDate')}
      className={className}
      tabIndex={selected ? 0 : -1}
      {...other}
    >
      <span className={classes.dayLabel}>{utils.format(day, 'dayOfMonth')}</span>
    </ButtonBase>
  );
};

Day.displayName = 'Day';

Day.propTypes = {
  current: PropTypes.bool,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  selected: PropTypes.bool,
};

Day.defaultProps = {
  disabled: false,
  hidden: false,
  current: false,
  selected: false,
};

export default Day;
