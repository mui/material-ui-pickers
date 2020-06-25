import * as React from 'react';
import { DesktopDateRangePicker } from '../';
import { screen } from '@testing-library/react';
import { utilsToUse, getByMuiTest } from './test-utils';
import { TextField, TextFieldProps } from '@material-ui/core';
import { createClientRender, fireEvent } from './createClientRender';

const defaultRangeRenderInput = (startProps: TextFieldProps, endProps: TextFieldProps) => (
  <>
    <TextField data-mui-test="start-input" {...startProps} />
    <TextField data-mui-test="end-input" {...endProps} />
  </>
);

describe('<DateRangePicker />', () => {
  const render = createClientRender({ strict: false });

  it(`doesn't crashes if opening picker with invalid date input`, async () => {
    render(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        calendars={3}
        onChange={jest.fn()}
        value={[utilsToUse.date(new Date(NaN)), utilsToUse.date('2018-01-31T00:00:00.000')]}
      />
    );

    fireEvent.focus(getByMuiTest('start-input'));

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
