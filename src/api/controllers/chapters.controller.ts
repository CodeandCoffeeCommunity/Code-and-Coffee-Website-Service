import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { getEvents } from "../service/events.service";

export async function chaptersController(): Promise<APIGatewayProxyStructuredResultV2> {
  return {
    statusCode: 200,
    body: JSON.stringify(await getEvents()),
    headers: {
      "Content-Type": "application/json",
    },
  };
}
