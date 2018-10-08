import { ComponentClass, ReactNode } from 'react';
import { DateTextFieldProps } from '../_shared/DateTextField';
import { PopoverProps } from '@material-ui/core/Popover';

export type InlineWrapperProps =Partial<DateTextFieldProps> & {
  onOpen?: () => void;
  onClose?: () => void;
  handleAccept?: () => void;
  PopoverProps?: Partial<PopoverProps>;
}

declare const InlineWrapper: ComponentClass<InlineWrapperProps>;

export default InlineWrapper;
