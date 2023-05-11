import {APIGatewayProxyEventV2} from "aws-lambda";
import {APIGatewayProxyStructuredResultV2} from "aws-lambda/trigger/api-gateway-proxy";
import {getChapterIcon} from "../dao/settings.dao";

export async function chapterIconController(event: APIGatewayProxyEventV2):Promise<APIGatewayProxyStructuredResultV2> {
  return {
    statusCode: 200,
    body: new Buffer((await getChapterIcon('boston-code-and-coffee'))).toString('base64'),
    headers: {
      "Content-Type": "image/png",
    },
    isBase64Encoded: true
  };
}