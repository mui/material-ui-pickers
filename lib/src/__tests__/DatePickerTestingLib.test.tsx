import * as React from 'react';
import { DatePicker } from '../DatePicker';
import { TextField } from '@material-ui/core';
import { screen } from '@testing-library/react';
import { createClientRender } from './createClientRender';

describe('DatePicker testing lib', () => {
  const render = createClientRender({ strict: false });
  it('Allows to select edge years from list', () => {
    render(
      <DatePicker
        open
        value={null}
        onChange={jest.fn()}
        views={['year']}
        minDate="2000-01-01"
        maxDate="2010-01-01"
        renderInput={props => <TextField {...props} />}
      />
    );

    expect(screen.getByText('2010').parentElement).toBeDisabled();
  });
});
