import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

export const createOverrides = (theme: Theme): StyleRules => ({
  body: {
    fontFamily: 'roboto',
    '-webkit-font-smoothing:': 'antialiased',
    backgroundColor: theme.palette.background.default,
  },
  h1: theme.typography.h1,
  h2: {
    ...theme.typography.h2,
    margin: '32px 0 16px',
  },
  h3: {
    ...theme.typography.h3,
    margin: '32px 0 16px',
  },
  h4: {
    ...theme.typography.h4,
    margin: '32px 0 16px',
  },
  h5: theme.typography.h5,
  h6: theme.typography.h2,
  p: {
    color: theme.palette.text.primary,
  },
  a: {
    color: theme.palette.secondary.main,
  },
  pre: {
    margin: '24px 0',
    padding: '12px 18px',
    overflow: 'auto',
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
  },
  code: {
    fontSize: 14,
    lineHeight: 1.6,
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    color: theme.palette.type === 'dark' ? theme.palette.text.primary : 'black',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
  },
});
