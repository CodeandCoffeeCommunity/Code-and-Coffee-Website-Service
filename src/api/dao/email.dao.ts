import { request } from "../util/request.util";
import { AppConf } from "../app-conf";

export type EmailContent = {
  recipient: string | Array<string>;
  subject: string;
  body: string;
};

export async function sendEmail(email: EmailContent) {
  await request({
    name: "Send Email",
    method: "POST",
    url: AppConf.emailAppUrl,
    headers: {
      "Content-Type": "application/json",
    },
    body: email,
  });
}
