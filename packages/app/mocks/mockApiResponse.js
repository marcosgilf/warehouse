export const mockApiResponse = (body = [], status = 200) =>
  new window.Response(JSON.stringify(body), { status });
