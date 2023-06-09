import { APIGatewayProxyEventV2 } from "aws-lambda";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { MeetupEvent } from "./dao/meetup.dao";
import { AppConf } from "./app-conf";
import { Controller, routes } from "./routes";
import colors from "colors";

export type EventsResponse = Array<MeetupEvent>;

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> {
  try {
    return await handleRequest(event);
  } catch (e) {
    console.error(`Internal server error: ${e}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        requestId: event.requestContext.requestId,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
}

async function handleRequest(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> {
  console.log("request received");
  if (!isApiKeyValid(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Unauthorized",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  const path = event.requestContext.http.path;
  const method = event.requestContext.http.method.toUpperCase();
  let controller = undefined as undefined | Controller;
  for (const route of routes) {
    if (method === route.method && new RegExp(`^${route.path}$`).test(path)) {
      controller = route.controller;
      break;
    }
  }
  if (controller) {
    const response = await controller(event);
    if (!response.headers) {
      response.headers = {};
    }
    response.headers["Access-Control-Allow-Origin"] = "*";
    return response;
  }
  console.log(
    colors.blue("No controller found for path ") + colors.yellow(`"${path}"`)
  );
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "Not found",
      requestId: event.requestContext.requestId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

const API_KEY_PATH = /^\/api\/.*/;

/**
 * Checks if an API key is needed, and if so, if it is valid. API Keys are required for all non cached requests.
 * @param request The request to validate.
 */
function isApiKeyValid(request: APIGatewayProxyEventV2): boolean {
  if (API_KEY_PATH.test(request.requestContext.http.path)) {
    return request.headers?.["x-api-key"] === AppConf.apiKey;
  }
  return true;
}
