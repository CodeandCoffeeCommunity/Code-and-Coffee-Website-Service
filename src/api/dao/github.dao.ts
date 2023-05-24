import { request } from "../util/request.util";
import { AppConf } from "../app-conf";

export type GithubIssue = {
  title: string;
  body: string;
};

export async function createIssue(
  repo: string,
  issue: GithubIssue
): Promise<void> {
  await request({
    name: "Create Github Issue",
    url: `${AppConf.githubApiBaseUrl}/repos/${repo}/issues`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${AppConf.githubAuthKey}`,
      Accept: "application/vnd.github+json",
    },
    body: issue,
  });
}
