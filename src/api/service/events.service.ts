import { getMeetupEvents, MeetupEvent } from "../dao/meetup.dao";
import { getChapters } from "../dao/settings.dao";

/**
 * Get a list of all upcoming events for Code and Coffee.
 */
export async function getEvents(): Promise<Array<MeetupEvent>> {
  const chapters = await getChapters();
  const events = await getMeetupEvents(chapters);
  return events.sort((a, b) => {
    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
  });
}
