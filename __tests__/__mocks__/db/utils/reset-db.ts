import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { filenames, writeJSONToFile } from "@/lib/db/db-utils";

export async function resetDB() {
  //failsafe against production db!
  const isSafeToReset = process.env.NODE_ENV === "test" || process.env.CYPRESS;

  if (!isSafeToReset) {
    console.log("WARNING: Database reset is unavailable outside test environment!");
    return;
  }

  const { fakeBands, fakeShows, fakeReservations, fakeUsers } = await readFakeData();
  // overwrite data in files
  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.reservations, fakeReservations),
    writeJSONToFile(filenames.users, fakeUsers)
  ]);
}
