/// <reference types="cypress" />

// Load Chance
let Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

When(/^eu realizo o cadastro$/, () => {
  // Type
  cy.get('input[placeholder="First Name"]').type(chance.first());
  cy.get('input[ng-model^="Last"]').type(chance.last());
  cy.get('input[ng-model^="Email"]').type(chance.email());
  cy.get('input[ng-model^="Phone"]').type(chance.phone({ formatted: false }));

  // Check -> radio's and checkboxes
  cy.get('input[value=FeMale]').check('FeMale');
  cy.get('input[type=checkbox]').check('Cricket');
  cy.get('input[type=checkbox]').check('Hockey');

  //Select - when select tag
  cy.get('select#Skills').select('Javascript');
  cy.get('select#countries').select('Argentina');
  cy.get('select#country').select('Australia', { force: true });
  cy.get('select#yearbox').select('1995');
  cy.get('select[ng-model^=month]').select('February');
  cy.get('select#daybox').select('1');

  cy.get('input#firstpassword').type('Ab1234');
  cy.get('input#secondpassword').type('Ab1234');

  cy.get('input#imagesrc').attachFile('image.png');
});

And(/^clico em salvar$/, () => {
  cy.get('button#submitbtn').click();
});

Then(/^eu acesso o sistema$/, () => {
  cy.wait('@postNewtable').then(resNewTable => {
    cy.log(resNewTable.status);
    expect(resNewTable.status).to.eq(201);
  });

  cy.wait('@postUsertable').then(resUserTable => {
    expect(resUserTable.status).to.eq(201);
  });

  cy.wait('@getNewtable').then(resGetNewTable => {
    expect(resGetNewTable.status).to.eq(200);
  });

  cy.url().should('contain', 'WebTable');
});
