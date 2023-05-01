import { request } from "../util/request.util";
import { AppConf } from "../app-conf";

/**
 * The info for a Code and Coffee Chapter.
 */
export type Chapter = {
  name: string;
  meetupGroupUrlName: string;
};

/**
 * Get a list of all the Code and Coffee Chapters.
 */
export async function getChapters(): Promise<Chapter[]> {
  return (
    await request({
      name: "Chapters Setting",
      url: `${AppConf.settingsHost}/chapters.json`,
      method: "GET",
    })
  ).data as Chapter[];
}
