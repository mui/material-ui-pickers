import * as React from 'react';
import clsx from 'clsx';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
// @ts-ignore TODO make definitions
import TrapFocus from '@material-ui/core/Modal/TrapFocus';
import Popper, { PopperProps } from '@material-ui/core/Popper';
import { WrapperProps } from './Wrapper';
import { makeStyles } from '@material-ui/core/styles';
import { InnerMobileWrapperProps } from './MobileWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { useGlobalKeyDown, keycode } from '../_shared/hooks/useKeyDown';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { executeInTheNextEventLoopTick, createDelegatedEventHandler } from '../_helpers/utils';

export interface InnerDesktopPopperWrapperProps {
  /** Popover props passed to material-ui Popover */
  PopperProps?: Partial<PopperProps>;
  TransitionComponent?: React.ComponentType<TransitionProps>;
}

export interface DesktopWrapperProps
  extends InnerDesktopPopperWrapperProps,
    WrapperProps,
    Partial<InnerMobileWrapperProps> {}

const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: theme.zIndex.modal,
  },
  paper: {
    transformOrigin: 'top center',
    '&:focus': {
      outline: 'auto',
      '@media (pointer:coarse)': {
        outline: 0,
      },
    },
  },
}));

export const DesktopPopperWrapper: React.FC<DesktopWrapperProps> = ({
  open,
  wider,
  children,
  PopperProps,
  onClear,
  onDismiss,
  onSetToday,
  onAccept,
  showTabs,
  DateInputProps,
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
  showTodayButton,
  clearable,
  DialogProps,
  PureDateInputComponent,
  TransitionComponent = Grow,
  KeyboardDateInputComponent = KeyboardDateInput,
  ...other
}) => {
  const classes = useStyles();
  const inputRef = React.useRef<HTMLDivElement>(null);
  const popperRef = React.useRef<HTMLElement>(null);

  useGlobalKeyDown(open, {
    [keycode.Esc]: onDismiss,
  });

  const handleBlur = () => {
    executeInTheNextEventLoopTick(() => {
      if (
        inputRef.current?.contains(document.activeElement) ||
        popperRef.current?.contains(document.activeElement)
      ) {
        return;
      }

      onDismiss();
    });
  };

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInputComponent
        {...other}
        {...DateInputProps}
        onBlur={createDelegatedEventHandler(handleBlur, DateInputProps.onBlur)}
        containerRef={inputRef}
      />

      <Popper
        transition
        placement="bottom"
        open={open}
        anchorEl={inputRef.current}
        {...PopperProps}
        className={clsx(classes.popper, PopperProps?.className)}
      >
        {({ TransitionProps }) => (
          <TrapFocus
            open={open}
            disableAutoFocus
            disableEnforceFocus
            isEnabled={() => true}
            getDoc={() => popperRef.current?.ownerDocument ?? document}
          >
            <TransitionComponent {...TransitionProps} timeout={350}>
              <Paper
                ref={popperRef}
                onBlur={handleBlur}
                tabIndex={-1}
                elevation={8}
                className={classes.paper}
              >
                {children}
              </Paper>
            </TransitionComponent>
          </TrapFocus>
        )}
      </Popper>
    </WrapperVariantContext.Provider>
  );
};
