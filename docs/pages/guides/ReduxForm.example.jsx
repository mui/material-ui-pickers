import React from 'react';
import Code from '../../_shared/Code';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { reduxForm, Field, formValueSelector } from 'redux-form';

const DateField = props => {
  const {
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  return (
    <KeyboardDatePicker
      {...inputProps}
      {...others}
      format="dd/MM/yyyy"
      value={value ? new Date(value) : null}
      disabled={submitting}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      error={error && touched}
      onChange={date => Date.parse(date) && inputProps.onChange(date.toISOString())}
    />
  );
};

class ReduxFormExample extends React.PureComponent {
  render() {
    return (
      <form>
        <Grid container>
          <Grid item container justify="center" xs={12}>
            <Field name="date" component={DateField} />
          </Grid>
          <Grid item xs={12} sm={12} style={{ margin: '24px' }}>
            <Code
              children={JSON.stringify(
                {
                  values: {
                    date: this.props.date,
                  },
                },
                null,
                2
              )}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

const selector = formValueSelector('example');
const mapStateToProps = state => ({
  date: selector(state, 'date'),
  initialValues: {
    date: new Date().toISOString(),
  },
});
const createReduxForm = reduxForm({ form: 'example' });
export default connect(mapStateToProps)(createReduxForm(ReduxFormExample));
