import * as React from 'react';
import { WrapperProps } from './Wrapper';
import { StaticWrapperProps } from './StaticWrapper';
import { InnerMobileWrapperProps } from './MobileWrapper';
import { InnerDesktopWrapperProps } from './DesktopWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { executeInTheNextEventLoopTick } from '../_helpers/utils';
import { useGlobalKeyDown, keycode } from '../_shared/hooks/useKeyDown';
import { ExportedPickerPopperProps, PickerPopper } from '../_shared/PickerPopper';

export interface InnerDesktopPopperWrapperProps extends ExportedPickerPopperProps {}

export interface DesktopPopperWrapperProps
  extends InnerDesktopPopperWrapperProps,
    WrapperProps,
    Partial<InnerMobileWrapperProps & StaticWrapperProps & InnerDesktopWrapperProps> {}

export const DesktopPopperWrapper: React.FC<DesktopPopperWrapperProps> = ({
  open,
  children,
  PopperProps,
  onDismiss,
  DateInputProps,
  TransitionComponent,
  KeyboardDateInputComponent = KeyboardDateInput,
}) => {
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
      <KeyboardDateInputComponent {...DateInputProps} containerRef={inputRef} onBlur={handleBlur} />

      <PickerPopper
        role="tooltip"
        open={open}
        innerRef={popperRef}
        anchorEl={inputRef.current}
        TransitionComponent={TransitionComponent}
        PopperProps={PopperProps}
        onBlur={handleBlur}
      >
        {children}
      </PickerPopper>
    </WrapperVariantContext.Provider>
  );
};
