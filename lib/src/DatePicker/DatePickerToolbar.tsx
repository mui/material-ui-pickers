import * as React from 'react';
import clsx from 'clsx';
import PickerToolbar from '../_shared/PickerToolbar';
import { DatePickerView } from './DatePicker';
import { PenIcon } from '../_shared/icons/PenIcon';
import { useUtils } from '../_shared/hooks/useUtils';
import { ToolbarComponentProps } from '../Picker/Picker';
import { isYearAndMonthViews, isYearOnlyView } from '../_helpers/date-utils';
import { Typography, makeStyles, IconButton, Grid } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    toolbar: {
      color: 'white',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop: 16,
      paddingBottom: 16,
    },
    toolbarLandscape: {
      padding: 16,
    },
    dateTitleContainer: {
      flex: 1,
    },
    dateTitleLandscape: {
      margin: 'auto 16px auto auto',
    },
  },
  { name: 'MuiPickersDatePickerRoot' }
);

export const DatePickerToolbar: React.FC<ToolbarComponentProps> = ({
  date,
  views,
  isLandscape,
  title = 'SELECT DATE',
}) => {
  const utils = useUtils();
  const classes = useStyles();

  const dateTitle = React.useMemo(() => {
    if (isYearOnlyView(views as DatePickerView[])) {
      return utils.getYearText(date);
    }

    if (isYearAndMonthViews(views as DatePickerView[])) {
      return utils.getMonthText(date);
    }

    return utils.getDatePickerHeaderText(date);
  }, [date, utils, views]);

  return (
    <PickerToolbar
      isLandscape={isLandscape}
      className={clsx(classes.toolbar, { [classes.toolbarLandscape]: isLandscape })}
    >
      <Typography color="inherit" variant="overline" children={title} />

      <Grid
        container
        justify="space-between"
        className={classes.dateTitleContainer}
        direction={isLandscape ? 'column' : 'row'}
        alignItems={isLandscape ? 'flex-start' : 'center'}
      >
        <Typography
          variant="h4"
          children={dateTitle}
          align={isLandscape ? 'left' : 'center'}
          className={clsx({ [classes.dateTitleLandscape]: isLandscape })}
        />

        <IconButton color="inherit">
          <PenIcon color="inherit" />
        </IconButton>
      </Grid>
    </PickerToolbar>
  );
};
