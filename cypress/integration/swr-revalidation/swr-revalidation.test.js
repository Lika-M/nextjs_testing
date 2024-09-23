import { generateNewReservation } from "../../../__tests__/__mocks__/fakeData/newReservation.ts";
import { generateRandomId } from "../../../lib/features/reservations/utils.ts";

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30 * ONE_SECOND;
const FIFTEEN_SECONDS = 15 * ONE_SECOND;

describe("Test revalidation on interval", () => {
  it("should refresh shows page after 30 seconds", () => {
    // 1.set up the clock
    cy.clock();
    cy.task("db:reset").visit("/shows");

    // 2.there should be only one show with sold out tickets
    cy.findAllByText(/sold out/i).should("have.length", 1);

    // 3.by all tickets for the first show (id : 0, 10 seats available)
    const reservation = generateNewReservation({
      reservationId: generateRandomId(),
      showId: 0,
      seatCount: 10
    });

    cy.task("addNewReservation", reservation);

    // 4.advance the clock by 1 sec and check again
    cy.tick(ONE_SECOND);
    cy.findAllByText(/sold out/i).should("have.length", 1);

    // 5.advance the clock by 30 sec
    //should have 2 sold out shows
    cy.tick(THIRTY_SECONDS);
    cy.findAllByText(/sold out/i).should("have.length", 2);
  });

  it.only("should refresh reservations page after tickets purchase and 15 sec interval", () => {
    cy.clock();
    cy.task("db:reset").visit("/reservations/0");

    cy.findByRole("main").within(() => {
      cy.findByRole("button", {name: /sign in/i}).click();
    });

    const reservation = generateNewReservation({
      reservationId: generateRandomId(),
      showId: 0,
      seatCount: 2
    });
    cy.task("addNewReservation", reservation);

    cy.tick(ONE_SECOND);
    cy.findByText(/10 seats left/i).should("exist");

    cy.tick(FIFTEEN_SECONDS);
    cy.findByText(/8 seats left/i).should("exist");
  });
});