import { asyncHandler } from './async-handler';
import httpMocks from 'node-mocks-http';

describe('asyncHandler', () => {
  it('should call next with error if async throws', async () => {
    const error = new Error('fail');
    const handler = asyncHandler(async () => { throw error; });
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await handler(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should call handler and not call next if no error', async () => {
    const handlerFn = jest.fn(async (req, res, next) => { res.status(200).json({ ok: true }); });
    const handler = asyncHandler(handlerFn);
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await handler(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ ok: true });
    expect(next).not.toHaveBeenCalledWith(expect.any(Error));
  });
});
