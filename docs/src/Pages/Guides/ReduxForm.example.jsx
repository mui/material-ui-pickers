import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import Code from '_shared/Code';
import Grid from '@material-ui/core/Grid';
import { reducer as formReducer } from 'redux-form';

export const required = value => {
  if (value && typeof value === 'string') {
    value = value.trim();
  }
  return value ? undefined : 'Required';
};

export class ReduxDatePicker extends React.Component {
  state = {
    valid: true,
    invalidMessage: '',
  };

  validateField(value) {
    let valid = !!(this.props.required && value);

    this.setState({ valid: valid, invalidMessage: valid ? null : 'Required' });
  }

  render() {
    const { input, required, ...custom } = this.props;

    return (
      <DatePicker
        input={input.name}
        keyboard
        clearable
        error={!this.state.valid}
        helperText={this.state.invalidMessage}
        format="dd/MM/yyyy"
        mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
        value={input.value || null}
        onChange={value => {
          this.validateField(value);
          return input.onChange(value);
        }}
        onBlur={event => {
          this.validateField(event.target.value);
        }}
        onError={(event, error) => {
          this.setState({ valid: false, invalidMessage: error });
        }}
        {...custom}
      />
    );
  }
}

class ReduxForm extends React.Component {
  handleSubmit = input => {
    console.log(input);
  };

  render() {
    const values = this.props.values || { date: null };

    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Grid container>
          <Grid item container justify="center" xs={12}>
            <div className="picker">
              <Field
                component={ReduxDatePicker}
                validate={required}
                required
                id="date"
                name="date"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} style={{ margin: '24px' }}>
            <Code text={JSON.stringify({ values }, null, 2)} />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export function mapStateToProps(state, props) {
  return {
    values: getFormValues('example')(state),
  };
}

ReduxForm = connect(mapStateToProps)(ReduxForm);

ReduxForm = reduxForm({
  form: 'example',
})(ReduxForm);

const ReduxFormExample = () => {
  const reducers = {
    form: formReducer,
  };
  const reducer = combineReducers(reducers);
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <ReduxForm />
    </Provider>
  );
};

export default ReduxFormExample;
