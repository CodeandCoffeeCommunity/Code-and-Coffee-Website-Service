import { getMeetupEvents } from "../../../src/lambda/dao/meetup.dao";

describe("Meetup DAO", () => {
  it("getMeetupEvents()", async () => {
    console.log(
      JSON.stringify(
        await getMeetupEvents(["291711514", "291610072", "291560465"])
      )
    );
  });
});
