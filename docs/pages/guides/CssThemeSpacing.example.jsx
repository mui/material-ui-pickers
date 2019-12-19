import React, { useState } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const muiTheme = createMuiTheme({
  spacing: 2,
});

function CssThemeExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiThemeProvider theme={muiTheme}>
      <DateTimePicker label="2px spacing" value={selectedDate} onChange={handleDateChange} />
    </MuiThemeProvider>
  );
}

export default CssThemeExample;
