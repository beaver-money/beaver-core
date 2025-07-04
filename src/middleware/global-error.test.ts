import { globalError } from './global-error';
import httpMocks from 'node-mocks-http';

describe('globalError middleware', () => {
  it('should return 500 and default message if no status or message', () => {
    const err = {} as any;
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    globalError(err, req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Woops, Internal Server Error' });
  });

  it('should return custom status and message if provided', () => {
    const err = { status: 404, message: 'Not found' } as any;
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    globalError(err, req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: 'Not found' });
  });
});
