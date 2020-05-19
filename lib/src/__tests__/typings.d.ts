import { MuiPickersComponentsToClassName } from '@material-ui/pickers/src/typings/overrides';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends MuiPickersComponentsToClassName {}
}
