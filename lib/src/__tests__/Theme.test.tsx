import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { mount } from './test-utils';
import { DatePicker } from '../DatePicker';
import { DateTimePicker } from '../DateTimePicker/DateTimePicker';

it('Should renders without crash in dark theme', () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  const component = mount(
    <ThemeProvider theme={theme}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        open
        openTo="hours"
        value={null}
        onChange={jest.fn()}
      />
    </ThemeProvider>
  );

  expect(component).toBeTruthy();
});

it('Should render without crash with props setup', () => {
  const theme = createMuiTheme({
    props: {
      // @ts-expect-error FIXME: Change back to `MuiPickersDateTimePicker` Theme Augmentation is right
      MuiDateTimePicker: {
        InputProps: {
          color: 'secondary',
        },
        cancelText: 'Cancel',
      },
    },
  });

  const component = mount(
    <ThemeProvider theme={theme}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        open
        openTo="hours"
        value={null}
        onChange={jest.fn()}
      />
    </ThemeProvider>
  );

  expect(component).toBeTruthy();
});

it('Should render component with different orientation', () => {
  const component = mount(
    <DatePicker
      renderInput={(props) => <TextField {...props} />}
      open
      orientation="landscape"
      value={null}
      onChange={jest.fn()}
    />
  );

  expect(component).toBeTruthy();
});
