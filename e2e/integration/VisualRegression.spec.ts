describe('Visual Regression', () => {
  const pages = [
    {
      url: '/',
      name: 'Landing',
      withDarkTheme: true,
    },
    {
      url: '/localization/date-fns',
      name: 'Date-fns localization',
    },
    {
      url: '/demo/datepicker',
      name: 'DatePicker demo',
      withDarkTheme: true,
    },
  ];

  before(() => {
    const now = new Date(2018, 1, 1);
    cy.clock(now.getMilliseconds());
  });

  pages.forEach(page => {
    context(page.name, () => {
      before(() => {
        cy.visit(page.url);
        const now = new Date(2018, 1, 1);
        cy.clock(now.getMilliseconds());
      });

      it(`Displays ${page.name} page`, () => {
        cy.percySnapshot(page.name);
      });

      if (page.withDarkTheme) {
        it(`Displays ${page.name} page in dark theme`, () => {
          cy.get('[data-testid=toggle-theme-btn]').click();
          cy.percySnapshot(`Dark ${page.name}`);
        });
      }
    });
  });
});
