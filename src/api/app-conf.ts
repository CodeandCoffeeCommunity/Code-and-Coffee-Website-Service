export const AppConf = {
  googleCalendarApiKey: process.env.GOOGLE_CALENDAR_API_KEY,
  googleCalendarId: process.env.GOOGLE_CALENDAR_ID,
  googleApiHost: process.env.GOOGLE_API_HOST,
  meetupApiHost: process.env.MEETUP_API_HOST,
  logsVerbose: (process.env.LOGS_VERBOSE || '').toUpperCase() === 'TRUE',
};
