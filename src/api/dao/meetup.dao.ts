import { request } from "../util/request.util";
import { AppConf } from "../app-conf";
import { Chapter } from "./settings.dao";

//See https://www.meetup.com/api/schema/#p03-objects-section for Meetup API details.

/**
 * Represents all the data that is returned from the Meetup API for an event.
 */
export type MeetupEvent = {
  id: string;
  eventUrl: string;
  title: string;
  going: number;
  imageUrl: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
  } | null;
  dateTime: string;
  group: {
    id: string;
    name: string;
    city: string;
    state: string;
    urlname: string;
  };
  description: string;
};

/**
 * The raw response from the Meetup API events query.
 */
type QueryResponse = {
  data: Record<
    string,
    {
      upcomingEvents: {
        edges: Array<{
          node: MeetupEvent;
        }>;
      };
    } | null
  >;
};

/**
 * Get the events from the Meetup API.
 */
export async function getMeetupEvents(
  chapters: Chapter[]
): Promise<Array<MeetupEvent>> {
  const finalQuery = formQuery(chapters);
  const response = await request({
    name: "Meetup Event",
    url: `${AppConf.meetupApiHost}/gql`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { query: finalQuery },
  });
  return processResponse((await response.json()) as QueryResponse);
}

const eventFragment =
  "fragment eventFragment on Event { id eventUrl title description going imageUrl venue { name address city state } dateTime group { id name city state urlname}}";
const groupFragment =
  "fragment groupFragment on Group { upcomingEvents(input:{first:10}) { edges { node { ...eventFragment } } } }";

/**
 * Form the query to get the events from the Meetup API.
 *
 * @param chapters The chapters to get events for.
 */
function formQuery(chapters: Array<Chapter>): string {
  let newQuery = "query {";
  for (const i in chapters) {
    newQuery += `result${i}:groupByUrlname(urlname:"${chapters[i].meetupGroupUrlName}") { ...groupFragment }`;
  }
  newQuery += "}" + eventFragment + groupFragment;
  return newQuery;
}

/**
 * Process the response from the query and return a list of events.
 *
 * @param response The response from the query.
 */
function processResponse(response: QueryResponse): Array<MeetupEvent> {
  const result = [] as Array<MeetupEvent>;
  for (const group of Object.values(response.data)) {
    if (group) {
      for (const event of group.upcomingEvents.edges) {
        result.push(event.node);
      }
    }
  }
  return result;
}
