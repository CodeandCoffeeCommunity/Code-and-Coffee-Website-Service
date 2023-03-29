import { getCalendarEvents } from "../../../src/lambda/dao/google-calendar.dao";

describe("Google Calendar DAO", () => {
  it("getCalendarEvents()", async () => {
    console.log(JSON.stringify(await getCalendarEvents()));
  });
});
