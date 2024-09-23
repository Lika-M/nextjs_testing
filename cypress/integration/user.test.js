const email = Cypress.env("TEST_USER_EMAIL");
const password = Cypress.env("TEST_PASSWORD");

describe("Test user page bypassing the sign-in flow", () => {
  it.only("displays shows page after clicking 'purchase more tickets' button", () => {
    cy.task("db:reset").signIn(email, password);
    cy.visit("/user");
  
    cy.findByRole("main").within(() => {
      cy.findByRole("button", {name: /purchase more tickets/i}).click();
    });
  
    cy.findByRole("heading", {name: /Upcoming Shows/i}).should("exist");
  });
});