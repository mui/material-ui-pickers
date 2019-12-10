import React from 'react';
import { DatePicker } from '../../src';
import { mountPicker } from '../support/commands';

describe('heh hoh', () => {
  it('Should mounts', () => {
    mountPicker(props => <DatePicker variant="static" id="wtf" {...props} />);

    cy.get('[data-test-id="previous-month"]').click();
    cy.contains('Sun, Dec 8');
  });
});
