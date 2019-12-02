import * as React from 'react';
import PickerToolbar from '../_shared/PickerToolbar';
import { DatePickerView } from './DatePicker';
import { PenIcon } from '../_shared/icons/PenIcon';
import { useUtils } from '../_shared/hooks/useUtils';
import { ToolbarComponentProps } from '../Picker/Picker';
import { isYearAndMonthViews, isYearOnlyView } from '../_helpers/date-utils';
import { Typography, makeStyles, IconButton, Grid, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { isLandscape: boolean }>(
  {
    toolbar: {
      color: 'white',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop: 16,
      paddingBottom: 16,
      padding: props => (props.isLandscape ? 16 : undefined),
    },
    dateTitleContainer: {
      flex: 1,
    },
    dateTitle: {
      margin: props => (props.isLandscape ? 'auto 16px auto auto' : undefined),
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
  const classes = useStyles({ isLandscape });

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
    <PickerToolbar isLandscape={isLandscape} className={classes.toolbar}>
      <Typography
        color="inherit"
        variant="overline"
        children={title}
        className={classes.toolbarTitle}
      />

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
          className={classes.dateTitle}
        />

        <IconButton>
          <PenIcon />
        </IconButton>
      </Grid>
    </PickerToolbar>
  );
};
