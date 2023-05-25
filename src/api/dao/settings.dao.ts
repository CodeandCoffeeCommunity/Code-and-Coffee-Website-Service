import { request } from "../util/request.util";
import { AppConf } from "../app-conf";

/**
 * The info for a Code and Coffee Chapter.
 */
export type Chapter = {
  name: string;
  meetupGroupUrlName: string;
};

export type NotificationSetting = {
  name: string;
  github: string;
  email: Array<string>;
  emailTitlePrepend: string;
};

/**
 * Get a list of all the Code and Coffee Chapters.
 */
export async function getChapters(): Promise<Chapter[]> {
  return (await (
    await request({
      name: "Chapters Setting",
      url: `${AppConf.settingsBaseUrl}/chapters.json`,
      method: "GET",
    })
  ).json()) as Chapter[];
}

/**
 * Get the icon for the given chapter.
 *
 * @param chapter The chapter to get the icon for.
 */
export async function getChapterIcon(chapter: string): Promise<ArrayBuffer> {
  return await (
    await request({
      name: "Chapter Icon",
      url: `${AppConf.settingsBaseUrl}/chapter-icons/${chapter}.png`,
      method: "GET",
    })
  ).arrayBuffer();
}

/**
 * Get all the notification settings.
 */
export async function getNotificationSettings(): Promise<
  Array<NotificationSetting>
> {
  return await (
    await request({
      name: "Notification Settings",
      url: `${AppConf.settingsBaseUrl}/notifications.json`,
      method: "GET",
    })
  ).json();
}
