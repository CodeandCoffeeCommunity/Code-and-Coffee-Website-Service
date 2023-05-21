import { EventsResponse } from "../../api";
import { WebConf } from "../web-conf";

/**
 * Get the details of all events from the Code and Coffee service.
 */
export async function getEvents(): Promise<EventsResponse> {
  const response = await fetch(`${WebConf.rootHost}/info/events`, {
    method: "GET",
  });
  return response.json();
}
