export const AppConf = {
  meetupApiBaseUrl: process.env.MEETUP_API_BASE_URL,
  githubApiBaseUrl: process.env.GH_API_BASE_URL,
  githubAuthKey: process.env.GH_AUTH_KEY,
  logsVerbose: (process.env.LOGS_VERBOSE || "").toUpperCase() === "TRUE",
  settingsBaseUrl: process.env.SETTINGS_BASE_URL,
  apiKey: process.env.API_KEY,
  emailAppUrl: process.env.EMAIL_APP_URL as string,
};
