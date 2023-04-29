import { getMeetupEvents, MeetupEvent } from "../dao/meetup.dao";

/**
 * Get a list of all upcoming events for Code and Coffee.
 */
export async function getEvents(): Promise<Array<MeetupEvent>> {
  return (await getMeetupEvents()).sort((a,b) => {
    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  });
}
