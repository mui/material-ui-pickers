describe('DateRangePicker', () => {
  beforeEach(() => {
    cy.visit('/regression');
    cy.viewport('macbook-13');
  });

  it('Opens and selecting a range in DateRangePicker', () => {
    cy.get('#desktop-range-picker input')
      .first()
      .focus();
    cy.get('[aria-label="Jan 24, 2019"').click();

    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 24);
  });

  it('Opens and selecting a range on the next month', () => {
    cy.get('#desktop-range-picker input')
      .first()
      .focus();

    cy.get('[data-mui-test="next-arrow-button"]')
      .eq(1)
      .click();

    cy.get('[aria-label="Mar 19, 2019"').click();
    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 47);
  });

  it.skip('Shows range preview on hover', () => {
    cy.get('#desktop-range-picker input')
      .first()
      .focus();

    cy.get('[aria-label="Jan 24, 2019"').trigger('mouseover');
  });
});
