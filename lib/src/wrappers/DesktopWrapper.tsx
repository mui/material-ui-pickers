import * as React from 'react';
import * as PropTypes from 'prop-types';
import { WrapperProps } from './Wrapper';
import { StaticWrapperProps } from './StaticWrapper';
import { InnerMobileWrapperProps } from './MobileWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { InnerDesktopTooltipWrapperProps } from './DesktopTooltipWrapper';
import { PickerPopper, ExportedPickerPopperProps } from '../_shared/PickerPopper';

export interface InnerDesktopWrapperProps extends ExportedPickerPopperProps {}

export interface DesktopWrapperProps
  extends InnerDesktopWrapperProps,
    WrapperProps,
    Partial<InnerMobileWrapperProps & InnerDesktopTooltipWrapperProps & StaticWrapperProps> {}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
  open,
  children,
  onDismiss,
  DateInputProps,
  KeyboardDateInputComponent = KeyboardDateInput,
  TransitionComponent,
  PopperProps,
}) => {
  const isFocusedRef = React.useRef(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLDivElement>(null);

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInputComponent {...DateInputProps} containerRef={inputRef} />

      <PickerPopper
        role="dialog"
        open={open}
        innerRef={dialogRef}
        anchorEl={inputRef.current}
        TransitionComponent={TransitionComponent}
        PopperProps={PopperProps}
        onFocus={() => (isFocusedRef.current = true)}
        onClose={onDismiss}
      >
        {children}
      </PickerPopper>
    </WrapperVariantContext.Provider>
  );
};

DesktopWrapper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
} as any;
