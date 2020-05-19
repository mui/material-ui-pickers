import { DateType } from '@date-io/type';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { MuiPickersComponentsToClassName } from '@material-ui/pickers/src/typings/overrides';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends MuiPickersComponentsToClassName {}
}

interface NavigatorClipboard {
  clipboard: {
    writeText: (value: string) => Promise<void>;
  };
}

interface Navigator extends NavigatorClipboard {}

declare module '*.mdx' {
  const value: React.ComponentType;
  export default value;
}

declare module '@date-io/type' {
  export type DateType = any;
}

declare module '@material-ui/pickers' {
  export type MaterialUiPickersDate = any;
}
