import { getEvents } from "../../../src/api/service/calendar.service";

describe("Calendar Service", () => {
  it("getEvents()", async () => {
    console.log(JSON.stringify(await getEvents()));
  });
});
