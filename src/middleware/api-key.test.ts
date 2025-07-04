import { requireApiKey } from './api-key';
import httpMocks from 'node-mocks-http';

describe('requireApiKey middleware', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, API_KEY_SECRET: 'test-secret' };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('calls next if API key is valid', () => {
    const req = httpMocks.createRequest({ headers: { 'x-api-key': 'test-secret' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    requireApiKey(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200); // default
  });

  it('returns 401 if API key is missing', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    requireApiKey(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'Invalid or missing API key' });
  });

  it('returns 401 if API key is invalid', () => {
    const req = httpMocks.createRequest({ headers: { 'x-api-key': 'wrong-key' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    requireApiKey(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'Invalid or missing API key' });
  });
});
