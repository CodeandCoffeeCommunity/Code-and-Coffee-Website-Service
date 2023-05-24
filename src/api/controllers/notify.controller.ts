import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { notify } from "../service/notify.service";

export async function notifyController(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> {
  try {
    await notify(JSON.parse(event.body || ""));
  } catch (e: any) {
    if (e.message === "INVALID_NOTIFICATION") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          result: "INVALID_NOTIFICATION",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          result: "FAILURE",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      result: "SUCCESS",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}
