import { StaticWrapper } from './StaticWrapper';
import { DateInputProps } from '../_shared/PureDateInput';
import { MobileWrapper, ModalWrapperProps } from './MobileWrapper';
import { DesktopWrapper, DesktopWrapperProps } from './DesktopWrapper';
import { ResponsiveWrapper, ResponsiveWrapperProps } from './ResponsiveWrapper';

export interface WrapperProps {
  open: boolean;
  onAccept: () => void;
  onDismiss: () => void;
  onClear: () => void;
  onSetToday: () => void;
  DateInputProps: DateInputProps;
  wider?: boolean;
  showTabs?: boolean;
}

type OmitInnerWrapperProps<T extends WrapperProps> = Omit<T, keyof WrapperProps | 'showTabs'>;

export type SomeWrapper =
  | typeof ResponsiveWrapper
  | typeof StaticWrapper
  | typeof MobileWrapper
  | typeof DesktopWrapper;

export type ExtendWrapper<TWrapper extends SomeWrapper> = TWrapper extends typeof StaticWrapper
  ? {} // no additional props
  : TWrapper extends typeof MobileWrapper
  ? OmitInnerWrapperProps<ModalWrapperProps>
  : TWrapper extends typeof DesktopWrapper
  ? OmitInnerWrapperProps<DesktopWrapperProps>
  : TWrapper extends typeof ResponsiveWrapper
  ? ResponsiveWrapperProps
  : never;

export function getWrapperVariant(wrapper: SomeWrapper) {
  if (wrapper === DesktopWrapper) {
    return 'desktop';
  } else if (wrapper === StaticWrapper) {
    return 'static';
  } else if (wrapper === MobileWrapper) {
    return 'mobile';
  } else {
    return null;
  }
}

export type WrapperVariant = ReturnType<typeof getWrapperVariant>;

export { StaticWrapper, MobileWrapper as ModalWrapper, DesktopWrapper as InlineWrapper };
