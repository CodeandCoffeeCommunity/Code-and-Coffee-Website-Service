import {APIGatewayProxyEventV2} from "aws-lambda";
import {APIGatewayProxyStructuredResultV2} from "aws-lambda/trigger/api-gateway-proxy";
import {chaptersController} from "./controllers/chapters.controller";
import {chapterIconController} from "./controllers/chapter-icon.controller";

type RouterMap = Record<string, Controller>;
export type Controller = (event: APIGatewayProxyEventV2) => APIGatewayProxyStructuredResultV2|Promise<APIGatewayProxyStructuredResultV2>

export const router:RouterMap = {
  "/api/events": chaptersController,
  "\\/api\\/chapter-icons\\/[A-Za-z-]+": chapterIconController,
  "/api/health": healthController,
};

function healthController(): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "OK",
      timestamp: new Date().toUTCString(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}