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
  field,
  form,
  maxDate = new Date('2100-01-01'),
  minDate = new Date('1900-01-01'),
  getShouldDisableDateError,
  ...other
}) => {
  const currentError = form.errors[field.name];

  return (
    <DatePicker
      autoOk
      clearable
      minDate={minDate}
      maxDate={maxDate}
      value={field.value}
      onError={(reason, value) => {
        switch (reason) {
          case 'invalidDate':
            form.setFieldError(field.name, 'Invalid date format');
            break;

          case 'disablePast':
            form.setFieldError(field.name, 'Values in the past are not allowed');
            break;

          case 'maxDate':
            form.setFieldError(field.name, `Date should not be after ${format(maxDate, 'P')}`);
            break;

          case 'minDate':
            form.setFieldError(field.name, `Date should not be after ${format(maxDate, 'P')}`);
            break;

          case 'shouldDisableDate':
            form.setFieldError(field.name, getShouldDisableDateError(value));
            break;

          default:
            form.setErrors({
              ...form.errors,
              [field.name]: undefined,
            });
        }
      }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={date => form.setFieldValue(field.name, date, false)}
      renderInput={props => (
        <TextField
          name={field.name}
          {...props}
          error={Boolean(currentError)}
          helperText={currentError ?? props.helperText}
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
