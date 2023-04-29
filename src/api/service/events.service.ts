import { getMeetupEvents, MeetupEvent } from "../dao/meetup.dao";

export async function getEvents(): Promise<Array<MeetupEvent>> {
  return getMeetupEvents();
}
