import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export type RequestOptions = AxiosRequestConfig & {
  name: string;
};
export async function request(options: RequestOptions): Promise<AxiosResponse> {
  console.info(
    `Requesting ${options.name} with options: ${JSON.stringify(options)}`
  );
  try {
    const response = await axios(options);
    console.info(
      `Request ${options.name} succeeded with response: ${JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      })}`
    );
    return response;
  } catch (e) {
    const axiosError = e as AxiosError;
    if (axiosError.response) {
      console.error(
        `Request ${options.name} failed with response: ${JSON.stringify({
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          headers: axiosError.response.headers,
          data: axiosError.response.data,
        })}`
      );
    }
    throw e;
  }
}
