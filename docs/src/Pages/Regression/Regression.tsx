import React, { useState, useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import { createRegressionDay as createRegressionDayRenderer } from './RegressionDay';
import { MuiPickersContext } from 'material-ui-pickers';

export function Regression() {
  const utils = useContext(MuiPickersContext);
  const [date, changeDate] = useState(new Date());

  const sharedProps = {
    value: date,
    onChange: changeDate,
    style: { margin: '0 10px' },
    renderDay: createRegressionDayRenderer(utils),
  };

  return (
    <>
      <Typography align="center" wvariant="h5" gutterBottom>
        This page is using for the automate regression of material-ui-pickers.
      </Typography>

      <Grid container justify="center" wrap="wrap">
        <DatePicker id="basic-datepicker" {...sharedProps} />
        <DatePicker id="clerable-datepicker" clearable {...sharedProps} />
        <DatePicker id="keyboard-datepicker" keyboard {...sharedProps} />
        <DatePicker
          keyboard
          id="keyboard-mask-datepicker"
          format="MM/dd/yyyy"
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          {...sharedProps}
        />
      </Grid>
    </>
  );
}
