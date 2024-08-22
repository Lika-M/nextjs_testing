
import { rest } from "msw";
import { readFakeData } from "../fakeData/index";
 
export const handlers = [
  rest.get("http://localhost:3000/api/shows/:showId", async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;
 
    // index / showId = 0 has seats available in fake data
    // index / showId = 1 has NO seats available
    return res(ctx.json({ show: fakeShows[showId] }));
  }),
]
