import React from 'react';
import Code from '../../_shared/Code';
import { date, object } from 'yup';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';
import { DatePicker, BaseDatePickerProps } from '@material-ui/pickers';

interface DatePickerFieldProps extends FieldProps, BaseDatePickerProps {
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
  console.log(form.errors, field.name);
  return (
    <DatePicker
      autoOk
      clearable
      minDate={minDate}
      maxDate={maxDate}
      value={field.value}
      onChange={date => form.setFieldValue(field.name, date, true)}
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

const schema = object({
  date: date()
    .required()
    .min(new Date())
    .max(new Date('2100-10-10')),
});

const FormikExample = () => {
  return (
    <Formik validationSchema={schema} onSubmit={console.log} initialValues={{ date: new Date() }}>
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <Field name="date" disablePast component={DatePickerField} />
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
