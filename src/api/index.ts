import {APIGatewayProxyEventV2} from "aws-lambda";
import {APIGatewayProxyStructuredResultV2} from "aws-lambda/trigger/api-gateway-proxy";
import {MeetupEvent} from "./dao/meetup.dao";
import {AppConf} from "./app-conf";
import {Controller, router} from "./router";
import colors from "colors";

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
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
}

async function handleRequest(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> {
  console.log("request received");
  const path = event.requestContext.http.path;
  let controller = undefined as undefined|Controller;
  for(const pathKey in router) {
    if(new RegExp(`^${pathKey}$`).test(path)) {
      controller = router[pathKey];
      break;
    }
  }
  if (controller) {
    const response = await controller(event);
    if (!response.headers) {
      response.headers = {};
    }
    response.headers['Access-Control-Allow-Origin'] = '*';
    return response
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
