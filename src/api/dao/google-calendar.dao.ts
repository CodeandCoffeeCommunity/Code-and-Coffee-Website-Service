import { AppConf } from "../app-conf";
import { request } from "../util/request.util";

export type GoogleCalendar = {
  kind: string;
  etag: string;
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: [];
  nextSyncToken: string;
  items: Array<GoogleCalendarEvent>;
};

export type GoogleCalendarEvent = {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location?: string;
  creator: {
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID: string;
  sequence: number;
};

export async function getCalendarEvents(): Promise<GoogleCalendar> {
  const response = await request({
    method: "GET",
    url: `https://www.googleapis.com/calendar/v3/calendars/${AppConf.googleCalendarId}/events?key=${AppConf.googleCalendarApiKey}`,
    name: "Google Calendar",
  });
  const data = (await response.data) as GoogleCalendar;
  sortEvents(data.items);
  return data;
}

function sortEvents(events: Array<GoogleCalendarEvent>) {
  events.sort((a, b) => {
    return (
      new Date(a.start.dateTime).valueOf() -
      new Date(b.start.dateTime).valueOf()
    );
  });
}
