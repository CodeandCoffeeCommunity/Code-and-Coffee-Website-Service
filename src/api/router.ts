import { getEvents } from "./service/events.service";

type RouterMap = Record<string, () => any>;

export const router = {
  "/api/events": getEvents,
  "/api/health": () => ({
    status: "OK",
    timestamp: new Date().toUTCString(),
  }),
} as RouterMap;
