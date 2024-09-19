import { generateNewReservation } from "../../__tests__/__mocks__/fakeData/newReservation.ts";
import { generateRandomId } from "../../lib/features/reservations/utils";

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30 * ONE_SECOND;

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
});