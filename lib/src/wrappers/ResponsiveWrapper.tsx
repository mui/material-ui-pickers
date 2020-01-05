import * as React from 'react';
import { useMediaQuery, Theme } from '@material-ui/core';
import { ModalWrapperProps, ModalWrapper } from './ModalWrapper';
import { InlineWrapperProps, InlineWrapper } from './InlineWrapper';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export interface ResponsiveWrapperProps extends InlineWrapperProps, ModalWrapperProps {
  /** Breakpoint where mobile picker will be changed to desktop
   * @default 'sm'
   */
  desktopModeBreakpoint?: Breakpoint;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  desktopModeBreakpoint = 'sm',
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
  showTodayButton,
  clearable,
  DialogProps,
  PopoverProps,
  ...other
}) => {
  const isDesktop = useMediaQuery<Theme>(theme => theme.breakpoints.up(desktopModeBreakpoint));

  return isDesktop ? (
    <InlineWrapper PopoverProps={PopoverProps} {...other} />
  ) : (
    <ModalWrapper
      okLabel={okLabel}
      cancelLabel={cancelLabel}
      clearLabel={clearLabel}
      todayLabel={todayLabel}
      showTodayButton={showTodayButton}
      clearable={clearable}
      DialogProps={DialogProps}
      {...other}
    />
  );
};
