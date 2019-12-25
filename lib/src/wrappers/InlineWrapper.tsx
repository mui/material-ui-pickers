import * as React from 'react';
import * as PropTypes from 'prop-types';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import Popover, { PopoverProps } from '@material-ui/core/Popover';
import { WrapperProps } from './Wrapper';
import { useKeyDownHandler } from '../_shared/hooks/useKeyDown';

export interface InlineWrapperProps extends WrapperProps {
  /** Popover props passed to material-ui Popover (with variant="inline") */
  PopoverProps?: Partial<PopoverProps>;
}

export const InlineWrapper: React.FC<InlineWrapperProps> = ({
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
    <>
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
    </>
  );
};

InlineWrapper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  PopoverProps: PropTypes.object,
} as any;
