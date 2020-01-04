import { StaticWrapper } from './StaticWrapper';
import { DateInputProps } from '../_shared/PureDateInput';
import { ModalWrapper, ModalWrapperProps } from './ModalWrapper';
import { InlineWrapper, InlineWrapperProps } from './InlineWrapper';
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
  | typeof ModalWrapper
  | typeof InlineWrapper;

export type ExtendWrapper<TWrapper extends SomeWrapper> = TWrapper extends typeof StaticWrapper
  ? {} // no additional props
  : TWrapper extends typeof ModalWrapper
  ? OmitInnerWrapperProps<ModalWrapperProps>
  : TWrapper extends typeof InlineWrapper
  ? OmitInnerWrapperProps<InlineWrapperProps>
  : TWrapper extends typeof ResponsiveWrapper
  ? ResponsiveWrapperProps
  : never;

export function getWrapperVariant(wrapper: SomeWrapper) {
  if (wrapper === InlineWrapper) {
    return 'desktop';
  } else if (wrapper === StaticWrapper) {
    return 'static';
  } else if (wrapper === ModalWrapper) {
    return 'mobile';
  } else {
    return null;
  }
}

export type WrapperVariant = ReturnType<typeof getWrapperVariant>;

export { StaticWrapper, ModalWrapper, InlineWrapper };
