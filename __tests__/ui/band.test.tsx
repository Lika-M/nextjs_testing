// Testing SSG
import { render, screen } from "@testing-library/react";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import type { Band } from "@/lib/features/bands/types";
import BandComponent from "@/pages/bands/[bandId]";

describe("Band component displays correctly band information", () => {
  let fakeBands: Band[] = [];

  beforeEach(async () => {
    const data = await readFakeData(); // if needed async fetching of data
    fakeBands = data.fakeBands;
  });

  test("displays heading", () => {
    render(<BandComponent band={fakeBands[0]} error={null} />);
    const heading = screen.getByRole("heading", {
      name: /the wandering bunnies/i, // using regex
    });

    expect(heading).toBeInTheDocument();
  });

  test("displays description", () => {
    render(<BandComponent band={fakeBands[0]} error={null} />);
    const description = screen.getByText(
      /blistering world music, supported by a moody water glass orchestra/i
    );

    expect(description).toBeInTheDocument();
  });

  test("displays image", () => {
    render(<BandComponent band={fakeBands[0]} error={null} />);
    const image = screen.getByRole("img", {
      name: "band photo",
    });

    expect(image).toBeInTheDocument();
  });

  test("displays image url", () => {
    render(<BandComponent band={fakeBands[0]} error={null} />);
    const image = screen.getByRole("img", {
      name: "band photo",
    });

    expect(image).toHaveAttribute("src", "/band-images/band15.jpg");
  });
});
