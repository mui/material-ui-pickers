import React, { useState } from 'react';

import Code from './Code';
import CodeIcon from '@material-ui/icons/Code';
import { withUtilsService } from './UtilsServiceContext';
import {
  IconButton,
  withStyles,
  Collapse,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

type Props = {
  source: { raw: string; default: React.FC<any> };
} & WithStyles<typeof styles>;

function Example({ classes, source }: Props) {
  if (!source.default && !source.raw) {
    throw new Error(
      'Missing component or raw component code, you likely forgot to .example to your example extension'
    );
  }

  const [expanded, setExpanded] = useState(false);
  // make each component rerender on utils change
  const Component = withUtilsService(source.default);

  return (
    <>
      <Collapse key="code" in={expanded}>
        {source.raw && <Code children={source.raw} />}
      </Collapse>

      <div className={classes.pickers}>
        <IconButton className={classes.sourceBtn} onClick={() => setExpanded(!expanded)}>
          <CodeIcon />
        </IconButton>

        <Component />
      </div>
    </>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    exampleTitle: {
      marginBottom: 8,
      '@media(max-width: 600px)': {
        marginLeft: 5,
      },
    },
    pickers: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      minHeight: 160,
      paddingTop: 40,
      width: '100%',
      margin: '0 auto 50px',
      position: 'relative',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',

        '& > div': {
          marginBottom: 32,
        },
      },
    },
    sourceBtn: {
      position: 'absolute',
      top: 10,
      right: 5,
    },
  });

export default withStyles(styles)(Example);
