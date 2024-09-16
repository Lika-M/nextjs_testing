describe("Bands page ISR cache test with build-time data", () => {
  it("verifies ISR cache behavior by skipping client-side scripts", () => {
    cy.request("/bands").its("body").then((html) => {
      const staticHtml = html.replace(/script src="\/_next\/static\/chunks\/pages\/bands.*?>.*?<\/script>/gm, "");

      cy.state("document").write(staticHtml);
    });

    cy.findByRole("heading", {name: /the joyous nun riot/i}).should("exist");
    cy.findByRole("heading", {name: /shamrock pete/i}).should("exist");
    cy.findByRole("heading", {name: /the wandering bunnies/i}).should("exist");
  });
});