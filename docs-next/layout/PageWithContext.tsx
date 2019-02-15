import React, { useState, useCallback } from 'react';
import { MuiThemeProvider, Theme, createMuiTheme } from '@material-ui/core';
import JssProvider from 'react-jss/lib/JssProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import { UtilsContext } from '../_shared/UtilsServiceContext';
import { createUtilsService, UtilsLib } from '../utils/utilsService';
import Layout from './Layout';
import getPageContext, { PageContext } from '../utils/getPageContext';

type ThemeType = 'light' | 'dark';
type Direction = Theme['direction'];

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
  const [utils, setUtils] = useState<UtilsLib>('date-fns');
  const [theme, setTheme] = useState<ThemeType>('light');
  const [direction, setDirection] = useState<Direction>('ltr');

  const setBodyDirection = () => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    document.body.dir = newDirection;

    setDirection(newDirection);
  };

  return (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <MuiThemeProvider
        theme={createCustomMuiTheme(theme, direction)}
        sheetsManager={pageContext.sheetsManager}
      >
        {/* <MuiPickersUtilsProvider utils={utilsMap[this.state.utils]}> */}
        <ThemeContext.Provider value={theme}>
          <UtilsContext.Provider value={createUtilsService(utils)}>
            <CssBaseline />

            <Layout
              onChangeUtils={setUtils}
              toggleDirection={setBodyDirection}
              toggleThemeType={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {children}
            </Layout>
          </UtilsContext.Provider>
        </ThemeContext.Provider>
        {/* </MuiPickersUtilsProvider> */}
      </MuiThemeProvider>
    </JssProvider>
  );
};
