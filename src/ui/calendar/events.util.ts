import {EventsResponse} from "../../api";

export type EventStats = {
  totalEvents: number;
  totalActiveChapters: number;
  totalRSVPs: number;
}

/**
 * Gets the stats for all the current events.
 *
 * @param events The events to get stats from
 */
export function getEventStats(events:EventsResponse):EventStats {
  const result:EventStats = {
    totalEvents:0,
    totalActiveChapters:0,
    totalRSVPs:0
  }
  const chapters = new Set<string>();
  events.forEach(event=>{
    result.totalEvents++;
    result.totalRSVPs+=event.going;
    if(!chapters.has(event.group.urlname)){
      result.totalActiveChapters++;
      chapters.add(event.group.urlname);
    }
  });
  return result;
}