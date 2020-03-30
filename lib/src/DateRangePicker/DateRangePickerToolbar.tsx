import * as React from 'react';
import PickerToolbar from '../_shared/PickerToolbar';
import Typography from '@material-ui/core/Typography';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { ToolbarComponentProps } from '../Picker/Picker';
import { ToolbarButton } from '../_shared/ToolbarButton';
import { DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';

export const useStyles = makeStyles(
  {
    penIcon: {
      position: 'relative',
      top: 4,
    },
    dateTextContainer: {
      display: 'flex',
    },
  },
  { name: 'MuiPickersDatePickerRoot' }
);

interface DateRangePickerToolbarProps
  extends CurrentlySelectingRangeEndProps,
    Pick<
      ToolbarComponentProps,
      'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView' | 'toolbarTitle' | 'toolbarFormat'
    > {
  date: DateRange;
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}

export const DateRangePickerToolbar: React.FC<DateRangePickerToolbarProps> = ({
  date: [start, end],
  toolbarFormat,
  isMobileKeyboardViewOpen,
  toggleMobileKeyboardView,
  currentlySelectingRangeEnd,
  setCurrentlySelectingRangeEnd,
  toolbarTitle = 'SELECT DATE RANGE',
}) => {
  const utils = useUtils();
  const classes = useStyles();

  const startText = start
    ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate)
    : 'Start';

  const endText = end ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate) : 'End';

  return (
    <PickerToolbar
      toolbarTitle={toolbarTitle}
      isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
      toggleMobileKeyboardView={toggleMobileKeyboardView}
      isLandscape={false}
      penIconClassName={classes.penIcon}
    >
      <div className={classes.dateTextContainer}>
        <ToolbarButton
          variant="h5"
          label={startText}
          selected={currentlySelectingRangeEnd === 'start'}
          onClick={() => setCurrentlySelectingRangeEnd('start')}
        />
        <Typography variant="h5">&nbsp;{'–'}&nbsp;</Typography>
        <ToolbarButton
          variant="h5"
          label={endText}
          selected={currentlySelectingRangeEnd === 'end'}
          onClick={() => setCurrentlySelectingRangeEnd('end')}
        />
      </div>
    </PickerToolbar>
  );
};
