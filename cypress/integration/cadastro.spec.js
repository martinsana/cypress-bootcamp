/// <reference types="cypress" />

// Load Chance
let Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

context('Cadastro', () => {
  it('Cadastro de usuário no site', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/api/1/databases/userdetails/collections/newtable?**',
      status: 201,
      response: {},
    }).as('postNewtable');

    cy.route({
      method: 'POST',
      url: '**/api/1/databases/userdetails/collections/usertable?**',
      status: 201,
      response: {},
    }).as('postUsertable');

    cy.route({
      method: 'GET',
      url: '**/api/1/databases/userdetails/collections/newtable?**',
      status: 200,
      response: {},
    }).as('getNewtable');

    cy.visit('Register.html');

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

    cy.get('button#submitbtn').click();

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
});

//input[placeholder="First Name"]
//input[ng-model^="Last"]
//input[ng-model^="Email"]
//input[ng-model^="Phone"]
//input[value=FeMale]
//input[type=checkbox]
//select#Skills
//select#countries
//select#country
//select#yearbox
//input[ng-model^="month"]
//select#daybox
//input#firstpassword
//input#secondpassword
