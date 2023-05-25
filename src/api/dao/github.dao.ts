import { request } from "../util/request.util";
import { AppConf } from "../app-conf";

export type GithubIssue = {
  title: string;
  body: string;
};

export interface GithubIssueResponse {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: any[];
  state: string;
  locked: boolean;
  assignee: null;
  assignees: any[];
  milestone: null;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: null;
  author_association: string;
  active_lock_reason: null;
  body: string;
  closed_by: null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
}

export interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export async function createIssue(
  repo: string,
  issue: GithubIssue
): Promise<GithubIssueResponse> {
  return (
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
    })
  ).json();
}
