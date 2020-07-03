import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '../DatePicker';
import { getByMuiTest } from './test-utils';
import { screen } from '@testing-library/react';
import { createClientRender, fireEvent } from './createClientRender';

describe('<DatePicker />', () => {
  const render = createClientRender({ strict: false });

  it('Allows to select edge years from list', () => {
    render(
      <DatePicker
        open
        reduceAnimations
        value={null}
        onChange={jest.fn()}
        openTo="year"
        minDate={new Date('2000-01-01')}
        maxDate={new Date('2010-01-01')}
        renderInput={props => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '2010' }));
    expect(getByMuiTest('datepicker-toolbar-date')).toHaveTextContent('Fri, Jan 1');
  });
});
