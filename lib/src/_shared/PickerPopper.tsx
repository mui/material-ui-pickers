import * as React from 'react';
import clsx from 'clsx';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Popper, { PopperProps } from '@material-ui/core/Popper';
import TrapFocus, { TrapFocusProps } from '@material-ui/core/Unstable_TrapFocus';
import { Grow, useForkRef } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalKeyDown, keycode } from './hooks/useKeyDown';
import { IS_TOUCH_DEVICE_MEDIA } from '../constants/dimensions';
import { executeInTheNextEventLoopTick } from '../_helpers/utils';
import { TransitionProps } from '@material-ui/core/transitions/transition';

export interface ExportedPickerPopperProps {
  /**
   * Popper props passed down to material-ui [Popper](https://material-ui.com/api/popper/#popper-api) component.
   */
  PopperProps?: Partial<PopperProps>;
  /**
   * Custom component for [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent?: React.ComponentType<TransitionProps>;
}

export interface PickerPopperProps extends ExportedPickerPopperProps, PaperProps {
  role: 'tooltip' | 'dialog';
  TrapFocusProps?: Partial<TrapFocusProps>;
  anchorEl: PopperProps['anchorEl'];
  open: PopperProps['open'];
  onClose: () => void;
  canClose?: () => boolean;
}

export const useStyles = makeStyles(
  theme => ({
    popper: {
      zIndex: theme.zIndex.modal,
    },
    paper: {
      transformOrigin: 'top center',
      '&:focus': {
        outline: 'auto',
        [IS_TOUCH_DEVICE_MEDIA]: {
          outline: 0,
        },
      },
    },
    topTransition: {
      transformOrigin: 'bottom center',
    },
  }),
  { name: 'MuiPickersPopper' }
);

export const PickerPopper: React.FC<PickerPopperProps> = ({
  role,
  PopperProps,
  TrapFocusProps,
  TransitionComponent = Grow,
  open,
  innerRef = null,
  anchorEl,
  children,
  onClose,
  canClose,
  ...other
}) => {
  const classes = useStyles();
  const paperRef = React.useRef<HTMLElement>(null);
  const handlePopperRef = useForkRef(paperRef, innerRef);

  useGlobalKeyDown(open, {
    [keycode.Esc]: onClose,
  });

  const handleBlur = () => {
    // document.activeElement is updating on the next tick after `blur` called
    executeInTheNextEventLoopTick(() => {
      if (paperRef.current?.contains(document.activeElement) || (canClose && canClose())) {
        return;
      }

      onClose();
    });
  };

  return (
    <Popper
      transition
      role={role}
      open={open}
      anchorEl={anchorEl}
      placement="bottom"
      className={clsx(classes.popper, PopperProps?.className)}
      {...PopperProps}
    >
      {({ TransitionProps, placement }) => (
        <TrapFocus
          open={open}
          disableAutoFocus={role === 'tooltip'}
          disableEnforceFocus={role === 'tooltip'}
          isEnabled={() => true}
          getDoc={() => paperRef.current?.ownerDocument ?? document}
        >
          <TransitionComponent {...TransitionProps} timeout={350}>
            <Paper
              tabIndex={-1}
              elevation={8}
              ref={handlePopperRef}
              className={clsx(classes.paper, {
                [classes.topTransition]: placement === 'top',
              })}
              onBlur={handleBlur}
              {...other}
            >
              {children}
            </Paper>
          </TransitionComponent>
        </TrapFocus>
      )}
    </Popper>
  );
};
