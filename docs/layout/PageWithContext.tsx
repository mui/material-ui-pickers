import React, { useState, useCallback } from 'react';
import { MuiThemeProvider, Theme, createMuiTheme } from '@material-ui/core';
import JssProvider from 'react-jss/lib/JssProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './Layout';
import { UtilsContext } from '../_shared/UtilsServiceContext';
import { createUtilsService, UtilsLib, utilsMap } from '../utils/utilsService';
import { PageContext } from '../utils/getPageContext';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { setPrismTheme } from '../utils/prism';

export type ThemeType = 'light' | 'dark';
export type Direction = Theme['direction'];

export const ThemeContext = React.createContext<ThemeType>('light');

const createCustomMuiTheme = (theme: ThemeType, direction: Theme['direction']) => {
  return createMuiTheme({
    direction,
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: theme,
    },
  });
};

type Props = {
  pageContext: PageContext;
  children: React.ReactChild;
};

export const PageWithContexts: React.SFC<Props> = ({ children, pageContext }) => {
  const [lib, setLib] = useState<UtilsLib>('date-fns');
  const [theme, setTheme] = useState<ThemeType>('light');
  const [direction, setDirection] = useState<Direction>('ltr');

  const setBodyDirection = useCallback(() => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    document.body.dir = newDirection;

    setDirection(newDirection);
  }, [direction]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    setPrismTheme(newTheme);
  }, [theme]);

  return (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <MuiThemeProvider
        theme={createCustomMuiTheme(theme, direction)}
        sheetsManager={pageContext.sheetsManager}
      >
        <MuiPickersUtilsProvider utils={utilsMap[lib]}>
          <ThemeContext.Provider value={theme}>
            <UtilsContext.Provider value={createUtilsService(lib)}>
              <CssBaseline />

              <Layout
                children={children}
                onChangeUtils={setLib}
                toggleThemeType={toggleTheme}
                toggleDirection={setBodyDirection}
              />
            </UtilsContext.Provider>
          </ThemeContext.Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </JssProvider>
  );
};
