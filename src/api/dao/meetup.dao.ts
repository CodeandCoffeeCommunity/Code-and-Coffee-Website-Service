import { request } from "../util/request.util";

//See https://www.meetup.com/api/schema/#p03-objects-section for Meetup API details.

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
  };
  dateTime: string;
  group: {
    id: string;
    name: string;
    city: string;
    state: string;
  };
  description: string;
};

export async function getMeetupEvents(
  eventIds: Array<string>
): Promise<Array<MeetupEvent>> {
  const finalQuery = formQuery(eventIds);
  const response = await request({
    name: "Meetup Event",
    url: "https://api.meetup.com/gql",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { query: finalQuery },
  });
  const data = (await response.data).data as Record<string, MeetupEvent>;
  const result = [] as Array<MeetupEvent>;
  for (const event of Object.values(data)) {
    result.push(event);
  }
  return result;
}

const eventFragment =
  "fragment eventFragment on Event { id eventUrl title description going imageUrl venue { name address city state} dateTime group { id name city state}}";

function formQuery(eventIds: Array<string>): string {
  let newQuery = "query {";
  eventIds.forEach((eventId) => {
    newQuery += `a${eventId}:event(id:"${eventId}"){ ...eventFragment }`;
  });
  newQuery += "}" + eventFragment;
  return newQuery;
}
