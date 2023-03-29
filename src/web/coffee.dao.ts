import { EventsResponse } from "../lambda";

/**
 * Get the details of all events from the Code and Coffee service.
 */
export async function getEvents(): Promise<EventsResponse> {
  const response = await fetch(
    "https://d3ldp4mijqfzeg.cloudfront.net/api/events",
    {
      method: "GET",
    }
  );
  return response.json();
}
