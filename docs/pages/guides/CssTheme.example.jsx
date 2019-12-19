import React, { useState } from 'react';
import lime from '@material-ui/core/colors/lime';
import { DateTimePicker } from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: lime,
  },
});

function CssThemeExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiThemeProvider theme={defaultMaterialTheme}>
      <DateTimePicker
        label="Lime DateTimePicker"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling={false}
      />
    </MuiThemeProvider>
  );
}

export default CssThemeExample;
