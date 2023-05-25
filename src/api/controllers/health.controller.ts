import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";

export function healthController(): APIGatewayProxyStructuredResultV2 {
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
