// // src/api/fetchInterceptors.ts

// export type FetchInterceptor = (url: string, options: RequestInit) => Promise<{ url: string; options: RequestInit }>;

// // Xóa interceptor JWT token mặc định ở đây nếu đã đăng ký ở fetchClient.ts
// let requestInterceptors: FetchInterceptor[] = [];

// export const addRequestInterceptor = (interceptor: FetchInterceptor) => {
//   requestInterceptors.push(interceptor);
// };

// export const applyRequestInterceptors = async (url: string, options: RequestInit) => {
//   let interceptedUrl = url;
//   let interceptedOptions = { ...options };
//   for (const interceptor of requestInterceptors) {
//     const result = await interceptor(interceptedUrl, interceptedOptions);
//     interceptedUrl = result.url;
//     interceptedOptions = result.options;
//   }
//   return { url: interceptedUrl, options: interceptedOptions };
// };

// // Response interceptor types and logic
// export type ResponseInterceptor = (response: Response, request: { url: string; options: RequestInit }) => Promise<Response>;

// let responseInterceptors: ResponseInterceptor[] = [];

// export const addResponseInterceptor = (interceptor: ResponseInterceptor) => {
//   responseInterceptors.push(interceptor);
// };

// export const applyResponseInterceptors = async (
//   response: Response,
//   request: { url: string; options: RequestInit }
// ): Promise<Response> => {
//   let interceptedResponse = response;
//   for (const interceptor of responseInterceptors) {
//     interceptedResponse = await interceptor(interceptedResponse, request);
//   }
//   return interceptedResponse;
// };
