import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import colors from 'colors'

export type RequestOptions = AxiosRequestConfig & {
  name: string;
};

export async function request(options: RequestOptions): Promise<AxiosResponse> {
  console.info(
    colors.blue.bold('REST Request ') +
    colors.yellow(options.name) +
    colors.blue(' with options: \n') +
    colors.yellow(JSON.stringify({
      name: options.name,
      url: options.url,
      method: options.method,
      headers: options.headers,
      data: !!options.data
    }))+ '\n'
  );
  try {
    const response = await axios(options);
    console.info(
      colors.blue.bold('REST Response ') +
      colors.yellow(options.name) +
      colors.green.bold(' success') +
      colors.blue(' with response: \n') +
      colors.yellow(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: !!response.data
      })) + '\n'
    );
    return response;
  } catch (e) {
    const axiosError = e as AxiosError;
    if (axiosError.response) {
      console.error(
        colors.blue.bold('REST Response ') +
        colors.yellow(options.name) +
        colors.red.bold(' failure') +
        colors.blue(' with response: \n') +
        colors.yellow(JSON.stringify({
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          headers: axiosError.response.headers,
        })) + '\n'
      );
    }
    throw e;
  }
}
