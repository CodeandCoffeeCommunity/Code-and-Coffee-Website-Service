import { handler } from "../../src/lambda";
import testEvent from "./events/test.json";

describe("index", () => {
  it("should return a 200", async () => {
    const response = await handler(testEvent);
    expect(response.statusCode).toEqual(200);
  });
});
