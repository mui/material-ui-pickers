import { InlineDatePicker } from 'material-ui-pickers';
import React, { Fragment, PureComponent } from 'react';
import { withUtilsService } from '../../../_shared/UtilsServiceContext';

class InlineDatePickerAdvancedDemo extends PureComponent {
  state = {
    selectedDate: '2018-01-01T00:00:00.000Z',
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <InlineDatePicker
            monthSelectable
            spanHeader
            keyboard
            clearable
            variant="outlined"
            label="With month selection"
            value={selectedDate}
            onChange={this.handleDateChange}
            format={this.props.getFormatString({
              moment: 'MM/DD/YYYY',
              dataFns: 'MM/dd/yyyy',
            })}
            views={['year', 'month', 'day']}
            />
        </div>
      </Fragment>
    );
  }
}

export default withUtilsService(InlineDatePickerAdvancedDemo);
