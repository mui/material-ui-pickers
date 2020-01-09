import * as React from 'react';
import * as PropTypes from 'prop-types';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import Popover, { PopoverProps } from '@material-ui/core/Popover';
import { WrapperProps } from './Wrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { useKeyDownHandler } from '../_shared/hooks/useKeyDown';

export interface DesktopWrapperProps extends WrapperProps {
  /** Popover props passed to material-ui Popover */
  PopoverProps?: Partial<PopoverProps>;
}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
  open,
  wider,
  children,
  PopoverProps,
  onClear,
  onDismiss,
  onSetToday,
  onAccept,
  showTabs,
  DateInputProps,
  ...other
}) => {
  const ref = React.useRef();
  const handleKeydown = useKeyDownHandler(open, {
    13: onAccept, // Enter
  });

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInput {...other} {...DateInputProps} inputRef={ref} />

      <Popover
        open={open}
        onClose={onDismiss}
        anchorEl={ref.current}
        onEscapeKeyDown={handleKeydown}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        children={children}
        {...PopoverProps}
      />
    </WrapperVariantContext.Provider>
  );
};

DesktopWrapper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  PopoverProps: PropTypes.object,
} as any;
