it("displays correct heading", () => {
  cy.visit("/");
  cy.findByRole("button", {name: /shows/i}).click();
  cy.findByRole("heading", {name: /upcoming shows/i}).should("exist");
})