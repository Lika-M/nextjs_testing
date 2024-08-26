// test static routes
describe("Testing static routes", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays correct heading when navigate to /shows", () => {
    cy.findByRole("button", { name: /shows/i }).click();
    cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
  });
  
  it("displays correct heading when navigate to /bands", () => {
    cy.findByRole("button", { name: /bands/i }).click();
    cy.findByRole("heading", { name: /Our Illustrious Performers/i }).should("exist");
  });
  
  it("displays correct heading when navigate to /user", () => {
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("heading", { name: /Sign in to your account/i }).should("exist");
  });
})

//test dynamic routes