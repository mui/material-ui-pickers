import { DateType } from '@date-io/type';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import {
  MuiPickersComponentsToClassName,
  MuiPickersComponentsPropsList,
} from '@material-ui/pickers/src/typings';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends MuiPickersComponentsToClassName {}
}

declare module '@material-ui/core/styles/props' {
  export interface ComponentsPropsList extends MuiPickersComponentsPropsList {}
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
