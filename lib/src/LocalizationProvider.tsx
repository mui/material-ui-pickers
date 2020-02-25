import * as React from 'react';
import * as PropTypes from 'prop-types';
import { MuiPickersUtils } from './_shared/hooks/useUtils';

export const MuiPickersAdapterContext = React.createContext<MuiPickersUtils | null>(null);

export interface LocalizationProviderProps {
  adapter: new (...args: any) => MuiPickersUtils;
  children: React.ReactNode;
  locale?: any;
  libInstance?: any;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  adapter: Utils,
  children,
  locale,
  libInstance,
}) => {
  const utils = React.useMemo(() => new Utils({ locale, instance: libInstance }), [
    Utils,
    libInstance,
    locale,
  ]);

  return <MuiPickersAdapterContext.Provider value={utils} children={children} />;
};

LocalizationProvider.propTypes = {
  // @ts-ignore
  adapter: PropTypes.func.isRequired,
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]).isRequired,
};

export default LocalizationProvider;
