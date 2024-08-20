// Testing Static Page
import { render, screen } from "@testing-library/react";

import Home from "@/pages/index";

describe("Page has correct name and image", () => {
  test("Page has correct name", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: "Welcome to Popular Concert Venue",
    });

    expect(heading).toBeInTheDocument();
  });

  test("Image has correct name", () => {
    render(<Home />);
    const image = screen.getByRole("img", {
      name: "Concert goer with hands in the shape of a heart",
    });

    expect(image).toBeInTheDocument();
  });
});
