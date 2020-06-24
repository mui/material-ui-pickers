import * as React from 'react';

export const CanAutoFocusContext = React.createContext(true);

export const useCanAutoFocus = () => React.useContext(CanAutoFocusContext);
