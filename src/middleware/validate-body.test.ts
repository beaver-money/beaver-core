import { validateBody } from './validate-body';
import httpMocks from 'node-mocks-http';
import z from 'zod/v4';

describe('validateBody middleware', () => {
  const schema = z.object({ email: z.string().email(), password: z.string() });
  const middleware = validateBody(schema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next and set req.body if valid', () => {
    const req = httpMocks.createRequest({ body: { email: 'test@example.com', password: 'pw' } });
    const res = httpMocks.createResponse();
    middleware(req, res, next);
    expect(req.body).toEqual({ email: 'test@example.com', password: 'pw' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 and error details if invalid', () => {
    const req = httpMocks.createRequest({ body: { email: 'not-an-email', password: 'pw' } });
    const res = httpMocks.createResponse();
    middleware(req, res, next);
    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data).toHaveProperty('error', 'Invalid input data');
    expect(data.details[0].message).toMatch(/email/);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next(error) for non-Zod errors', () => {
    const badSchema = { parse: () => { throw new Error('fail'); } };
    const mw = validateBody(badSchema);
    const req = httpMocks.createRequest({ body: {} });
    const res = httpMocks.createResponse();
    const nextFn = jest.fn();
    mw(req, res, nextFn);
    expect(nextFn).toHaveBeenCalledWith(expect.any(Error));
  });
});
