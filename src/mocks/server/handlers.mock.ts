import { mockAuthToken } from 'mocks/model/user.mock';
import { ResponseTransformer, rest } from 'msw';

export function mockLoginRequest(
  options:
    | { transformer: () => ResponseTransformer | Promise<ResponseTransformer> }
    | { delay?: number } = {}
) {
  return rest.post(process.env.REACT_APP_API_PATH + '/auth-token', async (_, res, ctx) => {
    if ('transformer' in options) {
      return res(await options.transformer());
    }

    const transformers: ResponseTransformer<any>[] = [];

    if (options.delay) {
      transformers.push(ctx.delay(options.delay));
    }

    return res(ctx.json(mockAuthToken()), ...transformers);
  });
}
