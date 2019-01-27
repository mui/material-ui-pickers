describe('DatePicker', () => {
  before(() => {
    cy.visit('/api/datepicker');
  });

  it('Should open date picker on 01-01-2018', () => {
    cy.get('#basic-datepicker').click();
  });
});
