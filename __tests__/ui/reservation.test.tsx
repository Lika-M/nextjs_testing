import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

describe("Reservation component displays correctly information", () => {
  test("number of available seats", async () => {
    render(<Reservation showId={0} submitPurchase={jest.fn()} />);

    const seatCountText = await screen.findByText(/10 seats left/i);
    expect(seatCountText).toBeInTheDocument();
  });

  test("no available seats", async () => {
    render(<Reservation showId={1} submitPurchase={jest.fn()}/>);

    const seatCountText = await screen.findByText("Show is sold out!");
    expect(seatCountText).toBeInTheDocument();
  });
});
