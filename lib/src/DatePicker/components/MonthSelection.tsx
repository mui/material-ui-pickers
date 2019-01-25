import { IUtils } from '@date-io/core/IUtils';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import Month from './Month';

// Move to utils
import { setMonth, startOfYear } from 'date-fns';
import { DateType, DomainPropTypes } from '../../constants/prop-types';

export interface MonthSelectionProps extends WithUtilsProps, WithStyles<typeof styles> {
  date: MaterialUiPickersDate;
  minDate?: DateType;
  maxDate?: DateType;
  onChange: (date: MaterialUiPickersDate) => void;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
}

// Move to utils
const getMonthArray = (
  utils: IUtils<MaterialUiPickersDate>,
  year: Date
): MaterialUiPickersDate[] => {
  const firstMonth = startOfYear(year);
  const monthArray = [firstMonth];

  while (monthArray.length < 12) {
    const prevMonth = monthArray[monthArray.length - 1];
    monthArray.push(utils.getNextMonth(prevMonth));
  }

  return monthArray;
};

export class MonthSelection extends React.PureComponent<MonthSelectionProps> {
  public static propTypes: any = {
    date: PropTypes.shape({}).isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
  };

  public static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
  };

  public onMonthSelect = (month: number) => {
    const { date, onChange } = this.props;

    // Move to utils
    const newDate = setMonth(date, month);
    onChange(newDate);
  };

  public shouldDisableMonth = (month: Date) => {
    const { utils, disablePast, disableFuture, minDate, maxDate } = this.props;
    const now = utils.date();
    const isBeforeMin = utils.isBefore(
      month,
      utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : utils.date(minDate))
    );
    const isAfterMax = utils.isAfter(
      month,
      utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : utils.date(maxDate))
    );
    return isBeforeMin || isAfterMax;
  };

  public render() {
    const { date, classes, utils } = this.props;
    const currentMonth = utils.getMonth(date);

    return (
      <div className={classes.container}>
        {getMonthArray(utils, date).map(month => {
          const monthNumber = utils.getMonth(month);
          const monthText = utils.format(month, 'MMM');

          return (
            <Month
              key={monthText}
              value={monthNumber}
              selected={monthNumber === currentMonth}
              onSelect={this.onMonthSelect}
              disabled={this.shouldDisableMonth(month)}
            >
              {monthText}
            </Month>
          );
        })}
      </div>
    );
  }
}

export const styles = createStyles({
  container: {
    width: 310,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'stretch',
  },
});

export default withStyles(styles, { name: 'MuiPickersMonthSelection' })(
  withUtils()(MonthSelection)
);
