// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';
Cypress.Commands.add("resetDBAndIsrCache", () => {
  cy.task("db:reset");

  const secret = Cypress.env("REVALIDATION_SECRET");
  cy.request("GET", `/api/revalidate?secret=${secret}`)
});

// Note: for many auth systems,this would POST request to an API
// rather than sign-in flow
Cypress.Commands.add("signIn", (email, pass) => {
  cy.visit("/auth/signin");

  cy.findByLabelText(/email address/i)
    .clear()
    .type(email);

  cy.findByLabelText(/password/i)
    .clear()
    .type(pass);

  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i })
      .click();
  });

  cy.findByRole("heading", { name: /welcome/i }).should("exist");
});