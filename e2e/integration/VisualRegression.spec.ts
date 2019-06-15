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
      scenarios: [
        {
          name: 'Opened datepicker',
          execute: () => {
            cy.get('[data-test-id=datepicker-example]')
              .find('input')
              .first()
              .click();
          },
        },
      ],
    },
    {
      url: '/demo/timepicker',
      name: 'TimePicker demo',
    },
    {
      url: '/demo/datetime-picker',
      name: 'DateTimePicker demo',
    },
    {
      url: '/guides/css-overrides',
      name: 'Css overrides',
      scenarios: [
        {
          name: 'Custom material-ui theme',
          execute: () => {
            cy.get('[data-test-id=css-override]')
              .find('input')
              .click();
          },
        },
      ],
    },
  ];

  pages.forEach(page => {
    context(page.name, () => {
      before(() => {
        const now = new Date(2018, 1, 1);
        cy.clock(now.getMilliseconds());

        cy.visit(page.url);
      });

      it(`Displays ${page.name} page`, () => {
        cy.percySnapshot(page.name);
      });

      if (page.withDarkTheme) {
        it(`Displays ${page.name} page in dark theme`, () => {
          cy.toggleTheme();
          cy.percySnapshot(`Dark ${page.name}`);
          cy.toggleTheme();
        });
      }

      if (page.scenarios) {
        page.scenarios.forEach(hook => {
          it(`${page.name} scenario: ${hook.name}`, () => {
            hook.execute();
            cy.percySnapshot(`${page.name}: ${hook.name}`);
          });

          if (page.withDarkTheme) {
            it(`${page.name} scenario: ${hook.name} in dark theme`, () => {
              cy.toggleTheme({ force: true });
              cy.percySnapshot(`Dark ${page.name}: ${hook.name}`);
              cy.toggleTheme({ force: true });
            });
          }
        });
      }
    });
  });
});
