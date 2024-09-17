import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

describe("Test revalidation pages after updating.", () => {
  it("should load refreshed bands page from cache after new band is added", () => {
    // DB reset and check that new band is not on the page
    cy.task("db:reset").visit("/bands");
    cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("not.exist");

    // add a band via post request
    const bandId = generateRandomId();
    const band = generateNewBand(bandId);

    const secret = Cypress.env("REVALIDATION_SECRET");
    cy.request("POST", `/api/bands?secret=${secret}`, { newBand: band }).then(res => {
      //res.json({ band: addedBand, revalidated: true });
      expect(res.body.revalidated).to.equal(true);
    });

    // reload the page; new band should appear
    cy.reload();
    cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("exist");
  });
});
