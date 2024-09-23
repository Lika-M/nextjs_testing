import { generateNewBand } from "../../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../../lib/features/reservations/utils";
import { generateNewShow } from "../../../__tests__/__mocks__/fakeData/newShow";

describe("Test revalidation pages after updating on-demand.", () => {
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

    // reset ISR cache to the initial db condition
    cy.resetDBAndIsrCache()
  });

  it("should load refreshed shows page from cache after a new show is added", () => {
    cy.task("db:reset").visit("/shows");
    cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("not.exist");

    const showId = generateRandomId();
    const newShow = generateNewShow(showId);

    const secret = Cypress.env("REVALIDATION_SECRET");
    cy.request("POST", `/api/shows?secret=${secret}`, {newShow: newShow}).then(res => {
      expect(res.body.revalidated).to.equal(true);
    });

    cy.reload();
    cy.findByRole("heading", {name: /avalanche of cheese/i}).should("exist");

    cy.resetDBAndIsrCache();
  });
});
