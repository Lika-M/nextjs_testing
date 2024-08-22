import { render, screen } from "@testing-library/react";
import { UserReservations } from "@/components/user/UserReservations";

describe("Displays correct information about reservations if they exist", () => {

  test("information about user reservations when reservations exist", async () => {
    render(<UserReservations userId={1} />);
    const ticketsHeading = await screen.findByRole("heading", { name: /Your Tickets/i });

    expect(ticketsHeading).toBeInTheDocument();
  });

  test("purchase button displays 'purchase more' when reservations exist", async () => {
    render(<UserReservations userId={1} />);
    const purchaseButton = await screen.findByRole("button", { name: /purchase more tickets/i });

    expect(purchaseButton).toBeInTheDocument();
  });

});

describe("Displays correct information when no user reservations exist", () => {
  test("information when no reservations", async () => {
    render(<UserReservations userId={0} />);
    const ticketsHeading = screen.queryByRole("heading", { name: /your tickets/i });

    expect(ticketsHeading).not.toBeInTheDocument();
  });

  test("purchase button text displays 'purchase'", async () => {
    render(<UserReservations userId={0} />);
    const purchaseButton = await screen.findByRole("button", { name: /purchase tickets/i });

    expect(purchaseButton).toBeInTheDocument();
  });
});

