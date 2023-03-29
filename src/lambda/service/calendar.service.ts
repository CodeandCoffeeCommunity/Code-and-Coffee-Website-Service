import { getCalendarEvents } from "../dao/google-calendar.dao";
import { getMeetupEvents, MeetupEvent } from "../dao/meetup.dao";

export async function getEvents(): Promise<Array<MeetupEvent>> {
  const googleCalendarEvents = await getCalendarEvents();
  const eventIds = [] as Array<string>;

  for (const event of googleCalendarEvents.items) {
    const match = event.description.match(/https:\/\/www.meetup.com\/.*\//g);
    if (match) {
      const meetupUrl = match[0];
      const meetupEventId = meetupUrl.match(/(?<=\/events\/).*(?=\/)/g)?.[0];
      if (meetupEventId) {
        eventIds.push(meetupEventId);
      }
    }
  }

  return getMeetupEvents(eventIds);
}
