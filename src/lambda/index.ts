import { APIGatewayProxyEventV2 } from "aws-lambda";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { getEvents } from "./service/calendar.service";
import { MeetupEvent } from "./dao/meetup.dao";
import { AppConf } from "./app-conf";

export type EventsResponse = Array<MeetupEvent>;

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> {
  try {
    return await handleRequest(event);
  } catch (e) {
    console.log(JSON.stringify(AppConf));
    console.error(`Internal server error: ${e}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        requestId: event.requestContext.requestId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}

async function handleRequest(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> {
  const path = event.requestContext.http.path;
  if (path == "/prod/api/events") {
    return {
      statusCode: 200,
      body: JSON.stringify(await getEvents()),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

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
