import { requireSelf } from './require-self';
import httpMocks from 'node-mocks-http';

jest.mock('@src/resources/users/service', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

const userService = require('@src/resources/users/service').default;

describe('requireSelf middleware', () => {
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no auth0Id', async () => {
    const req = httpMocks.createRequest({ params: { id: '1' } });
    const res = httpMocks.createResponse();
    await requireSelf(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user matches auth0Id', async () => {
    const req = httpMocks.createRequest({
      params: { id: '1' },
      auth: { sub: 'auth0|123' },
    });
    const res = httpMocks.createResponse();
    userService.findById.mockResolvedValue({ auth0Id: 'auth0|123' });
    await requireSelf(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.statusCode).toBe(200); // default if not set
  });

  it('should return 403 if user does not match auth0Id', async () => {
    const req = httpMocks.createRequest({
      params: { id: '1' },
      auth: { sub: 'auth0|not-matching' },
    });
    const res = httpMocks.createResponse();
    userService.findById.mockResolvedValue({ auth0Id: 'auth0|123' });
    await requireSelf(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(res._getJSONData()).toEqual({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next(err) on error', async () => {
    const req = httpMocks.createRequest({
      params: { id: '1' },
      auth: { sub: 'auth0|123' },
    });
    const res = httpMocks.createResponse();
    const error = new Error('DB error');
    userService.findById.mockRejectedValue(error);
    const nextFn = jest.fn();
    await requireSelf(req, res, nextFn);
    expect(nextFn).toHaveBeenCalledWith(error);
  });
});
