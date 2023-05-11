import { APIGatewayProxyEventV2 } from "aws-lambda";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { getChapterIcon } from "../dao/settings.dao";

export async function chapterIconController(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> {
  try {
    return {
      statusCode: 200,
      body: new Buffer(
        await getChapterIcon(extractChapter(event.rawPath))
      ).toString("base64"),
      headers: {
        "Content-Type": "image/png",
      },
      isBase64Encoded: true,
    };
  } catch (e: any | Response) {
    if (e.status === 404) {
      return {
        statusCode: 404,
        body: "Not Found",
        headers: {
          "Content-Type": "text/plain",
        },
      };
    } else {
      throw e;
    }
  }
}

const chapterRegex = /(?<=\/api\/chapter-icons\/).*$/;
function extractChapter(path: string): string {
  const results = path.match(chapterRegex);
  if (results === null) {
    throw new Error(`Could not extract chapter from path ${path}`);
  }
  return results[0];
}
