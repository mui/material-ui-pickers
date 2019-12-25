import * as React from 'react';
import { useMediaQuery, Theme } from '@material-ui/core';
import { ModalWrapperProps, ModalWrapper } from './ModalWrapper';
import { InlineWrapperProps, InlineWrapper } from './InlineWrapper';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export interface ResponsiveWrapperProps extends InlineWrapperProps, ModalWrapperProps {
  /** Breakpoint where mobile picker will be changed to desktop
   * @default 'xs'
   */
  desktopModeBreakpoint?: Breakpoint;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  desktopModeBreakpoint = 'sm',
  ...other
}) => {
  const isDesktop = useMediaQuery<Theme>(theme => theme.breakpoints.up(desktopModeBreakpoint));

  return isDesktop ? <InlineWrapper {...other} /> : <ModalWrapper {...other} />;
};
