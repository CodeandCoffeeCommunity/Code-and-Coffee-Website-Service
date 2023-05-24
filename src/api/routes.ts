import { APIGatewayProxyEventV2 } from "aws-lambda";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { chaptersController } from "./controllers/chapters.controller";
import { chapterIconController } from "./controllers/chapter-icon.controller";
import { healthController } from "./controllers/health.controller";
import { notifyController } from "./controllers/notify.controller";

type Route = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  controller: Controller;
};
export type Controller = (
  event: APIGatewayProxyEventV2
) =>
  | APIGatewayProxyStructuredResultV2
  | Promise<APIGatewayProxyStructuredResultV2>;

export const routes: Array<Route> = [
  {
    method: "GET",
    path: "/info/events",
    controller: chaptersController,
  },
  {
    method: "GET",
    path: "/info/chapter-icons/[A-Za-z-]+",
    controller: chapterIconController,
  },
  {
    method: "GET",
    path: "/info/health",
    controller: healthController,
  },
  {
    method: "GET",
    path: "/api/health",
    controller: healthController,
  },
  {
    method: "POST",
    path: "/api/notify",
    controller: notifyController,
  },
];
