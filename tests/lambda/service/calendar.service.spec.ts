import { getEvents } from "../../../src/lambda/service/calendar.service";

describe("Calendar Service", () => {
  it("getEvents()", async () => {
    console.log(JSON.stringify(await getEvents()));
  });
});
