import * as React from 'react';
import clsx from 'clsx';
import ToolbarText from '../_shared/ToolbarText';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import DateTimePickerTabs from './DateTimePickerTabs';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePickerView } from './DateTimePicker';
import { ToolbarComponentProps } from '../Picker/Picker';
import { useMeridiemMode } from '../TimePicker/TimePickerToolbar';

export const useStyles = makeStyles(
  theme => ({
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around',
    },
    toolBar24h: {
      paddingLeft: 32,
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
    hourMinuteLabel: {
      top: 10,
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row',
    },
    dateHeader: {
      height: 60,
      minWidth: 110,
      marginRight: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    timeHeader: {
      height: 65,
      minWidth: 155,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    ampmSelection: {
      top: 11,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: -10,
    },
    ampmLabel: {
      fontSize: 18,
    },
  }),
  { name: 'MuiPickerDTToolbar' }
);

export interface CustomToolbarOptions {
  hideTabs?: boolean;
}

export const DateTimePickerToolbar: React.FC<ToolbarComponentProps & CustomToolbarOptions> = ({
  date,
  openView,
  setOpenView,
  ampm,
  hideTabs,
  dateRangeIcon,
  timeIcon,
  onChange,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange);

  return (
    <>
      <PickerToolbar className={clsx(classes.toolbar, { [classes.toolBar24h]: !ampm })}>
        <div className={classes.dateHeader}>
          <ToolbarButton
            variant="subtitle1"
            onClick={() => setOpenView('year')}
            selected={openView === 'year'}
            label={utils.getYearText(date)}
          />

          <ToolbarButton
            variant="h4"
            onClick={() => setOpenView('date')}
            selected={openView === 'date'}
            label={utils.getDateTimePickerHeaderText(date)}
          />
        </div>

        <div className={classes.timeHeader}>
          <div className={classes.hourMinuteLabel}>
            <ToolbarButton
              variant="h3"
              onClick={() => setOpenView('hours')}
              selected={openView === 'hours'}
              label={utils.getHourText(date, ampm!)}
            />

            <ToolbarText variant="h3" label=":" selected={false} className={classes.separator} />

            <ToolbarButton
              variant="h3"
              onClick={() => setOpenView('minutes')}
              selected={openView === 'minutes'}
              label={utils.getMinuteText(date)}
            />
          </div>

          {ampm && (
            <div className={classes.ampmSelection}>
              <ToolbarButton
                variant="subtitle1"
                typographyClassName={classes.ampmLabel}
                selected={meridiemMode === 'am'}
                label={utils.getMeridiemText('am')}
                onClick={() => handleMeridiemChange('am')}
              />

              <ToolbarButton
                variant="subtitle1"
                typographyClassName={classes.ampmLabel}
                selected={meridiemMode === 'pm'}
                label={utils.getMeridiemText('pm')}
                onClick={() => handleMeridiemChange('pm')}
              />
            </div>
          )}
        </div>
      </PickerToolbar>

      {showTabs && (
        <DateTimePickerTabs
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          view={openView as DateTimePickerView}
          onChange={setOpenView}
        />
      )}
    </>
  );
};
