import { getNotificationSettings } from "../dao/settings.dao";
import { sendEmail } from "../dao/email.dao";
import { createIssue } from "../dao/github.dao";

type Notification = {
  channel: string;
  title: string;
  message: string;
};
export async function notify(notification: Notification): Promise<void> {
  if (!isNotificationValid(notification)) {
    throw new Error("INVALID_NOTIFICATION");
  }
  const channelSetting = (await getNotificationSettings()).find(
    (setting) => setting.name === notification.channel
  );
  if (!channelSetting) {
    throw new Error("INVALID_NOTIFICATION");
  }
  if (channelSetting.email) {
    await sendEmail({
      body: notification.message,
      recipient: channelSetting.email,
      subject: channelSetting.emailTitlePrepend
        ? `${channelSetting.emailTitlePrepend}${notification.title}`
        : notification.title,
    });
  }
  if (channelSetting.github) {
    await createIssue(channelSetting.github, {
      title: notification.title,
      body: notification.message,
    });
  }
}

function isNotificationValid(notification: any): boolean {
  return !(
    !notification ||
    !notification.channel ||
    !notification.title ||
    !notification.message
  );
}
