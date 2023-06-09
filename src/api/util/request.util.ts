import colors from "colors";

export type RequestOptions = {
  name: string;
  url: string;
  body?: any;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
};

export async function request(options: RequestOptions): Promise<Response> {
  console.info(
    colors.blue.bold("REST Request ") +
      colors.yellow(options.name) +
      "\n" +
      colors.yellow(
        JSON.stringify({
          name: options.name,
          url: options.url,
          method: options.method,
          headers: options.headers,
          body: !!options.body,
        })
      ) +
      "\n"
  );
  let response;
  try {
    response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
      body: JSON.stringify(options.body),
    });
  } catch (e) {
    console.error(
      colors.blue.bold("REST Response ") +
        colors.yellow(options.name) +
        colors.red.bold(" FAILURE") +
        "\n" +
        colors.yellow(`ERROR: ${e}`) +
        "\n"
    );
    throw "Failed to fetch";
  }

  if (response.ok) {
    console.info(
      colors.blue.bold("REST Response ") +
        colors.yellow(options.name) +
        colors.green.bold(" SUCCESS") +
        "\n" +
        colors.yellow(
          JSON.stringify({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: !!response.body,
          })
        ) +
        "\n"
    );
  } else {
    console.error(
      colors.blue.bold("REST Response ") +
        colors.yellow(options.name) +
        colors.red.bold(" FAILURE") +
        "\n" +
        colors.yellow(
          JSON.stringify({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          })
        ) +
        "\n"
    );
    throw response;
  }
  return response;
}
