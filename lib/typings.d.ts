declare module '@date-io/type' {
  export type DateType = unknown;
}

declare module '@material-ui/core/internal/svg-icons/createSvgIcon' {
  import * as React from 'react';
  import { SvgIconProps } from '@material-ui/core/SvgIcon';

  declare const createSvgIcon: (path: React.ReactNode, name: string) => React.FC<SvgIconProps>;
  export default createSvgIcon;
}
