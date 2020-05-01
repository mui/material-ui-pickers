import React from 'react';
import Code from '../../_shared/Code';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';
import { format, isWeekend, isWednesday } from 'date-fns';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';

interface DatePickerFieldProps extends FieldProps, DatePickerProps {
  getShouldDisableDateError: (date: Date) => string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  form,
  field: { value, name },
  maxDate = new Date('2100-01-01'),
  minDate = new Date('1900-01-01'),
  getShouldDisableDateError,
  ...other
}) => {
  console.log(value);
  const currentError = form.errors[name];
  const toShowError = Boolean(currentError && form.touched[name]);

  return (
    <DatePicker
      autoOk
      clearable
      minDate={minDate}
      maxDate={maxDate}
      value={value}
      onError={(reason, value) => {
        switch (reason) {
          case 'invalidDate':
            form.setFieldError(name, 'Invalid date format');
            break;

          case 'disablePast':
            form.setFieldError(name, 'Values in the past are not allowed');
            break;

          case 'maxDate':
            form.setFieldError(name, `Date should not be after ${format(maxDate, 'P')}`);
            break;

          case 'minDate':
            form.setFieldError(name, `Date should not be after ${format(maxDate, 'P')}`);
            break;

          case 'shouldDisableDate':
            form.setFieldError(name, getShouldDisableDateError(value));
            break;

          default:
            form.setErrors({
              ...form.errors,
              [name]: undefined,
            });
        }
      }}
      // Make sure that your 3d param is set to `true` on order to not clear errors
      onChange={date => form.setFieldValue(name, date, false)}
      renderInput={props => (
        <TextField
          name={name}
          {...props}
          error={toShowError}
          helperText={toShowError ? currentError ?? props.helperText : undefined}
          // Make sure that your 3d param is set to `true` on order to not clear errors
          onBlur={() => form.setFieldTouched(name, true, false)}
        />
      )}
      {...other}
    />
  );
};

const FormikExample = () => {
  return (
    <Formik onSubmit={console.log} initialValues={{ date: new Date() }}>
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <Field
                name="date"
                disablePast
                component={DatePickerField}
                shouldDisableDate={(date: Date) => isWeekend(date) || isWednesday(date)}
                getShouldDisableDateError={(date: Date) => {
                  return isWeekend(date)
                    ? 'Weekends are not allowed'
                    : 'Wednesdays are not allowed';
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} style={{ margin: '24px' }}>
              <Code children={JSON.stringify({ errors, values }, null, 2)} />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default FormikExample;
