import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

// test static routes
describe("Static routes", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the correct heading when navigating to /shows", () => {
    cy.findByRole("button", { name: /shows/i }).click();
    cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
  });

  it("displays the correct heading when navigating to /bands", () => {
    cy.findByRole("button", { name: /bands/i }).click();
    cy.findByRole("heading", { name: /Our Illustrious Performers/i }).should("exist");
  });

  it("displays the correct heading when navigating to /user", () => {
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("heading", { name: /Sign in to your account/i }).should("exist");
  });
});

// Test dynamic routes
describe("Dynamic Routes", () => {
  beforeEach(() => {
    cy.task("db:reset");
  });

  it("displays the correct band name for a band that existed at build time (bands/id)", () => {
    cy.visit("/bands/1");
    cy.findByRole("heading", { name: /Shamrock Pete/i }).should("exist");
  });

  it("displays an error for a bands/id route when the band doesn't exist", () => {
    cy.visit("/bands/12345");
    cy.findByText(/Error: band not found/i).should("exist");
  });

  it("displays the correct band name for a band added after build time (bands/id)", () => {
    const bandId = generateRandomId();
    const newBand = generateNewBand(bandId);
    cy.task("addNewBand", newBand).visit(`/bands/${bandId}`);
    cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("exist");
  });
});