const email = Cypress.env("TEST_USER_EMAIL");
const password = Cypress.env("TEST_PASSWORD");

describe("Test auth wrapper", () => {
  it("runs auth flow for successful login to protected 'reservations' page", () => {
    // Visit reservations page for the first show (id: 0)
    cy.task("db:reset").visit("/reservations/0");

    // check for sign-in form
    // and that's no option to purchase tickets
    cy.findByRole("heading", { name: /Sign in to your account/i }).should("exist");
    cy.findByRole("button", { name: /purchase/i }).should("not.exist");
    

    //enter valid credentials and submit the form
    cy.findByLabelText(/email address/i)
      .clear()
      .type(email);

    cy.findByLabelText(/password/i)
      .clear()
      .type(password);

    cy.findByRole("main").within(() => {
      cy.findByRole("button", { name: /sign in/i }).click().wait(2000);
    });

    //check for the band name and purchase button
    cy.findByRole("heading", { name: /The Wandering Bunnies/i }).should("exist");
    cy.findByRole("button", { name: /purchase/i }).should("exist");

    //check for user email and sign-out button on the navbar
    cy.findByText(email).should("exist");
    cy.findByRole("button", { name: /sign out/i }).should("exist");
  });
});