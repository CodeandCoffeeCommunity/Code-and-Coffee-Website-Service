import { EventsResponse } from "../../api";
import { WebConf } from "../web-conf";

/**
 * Get the details of all events from the Code and Coffee service.
 */
export async function getEvents(): Promise<EventsResponse> {
  const response = await fetch(`https://${WebConf.rootUrl}/api/events`, {
    method: "GET",
  });
  return response.json();
}
