
import { signup, login } from './controller';
import httpMocks from 'node-mocks-http';
import axios from 'axios';

jest.mock('axios');
jest.mock('../resources/users/service', () => ({
  __esModule: true,
  default: {
    create: jest.fn().mockResolvedValue([{ id: '1', email: 'test@example.com', auth0Id: 'auth0|123' }]),
    findByEmail: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com', auth0Id: 'auth0|123' }),
  },
  sanitize: (user: any) => user,
}));

const fakeToken = 'fake-token';
const fakeUserInfo = { sub: 'auth0|123', email: 'test@example.com' };

describe('Auth Controller', () => {
  describe('signup', () => {
    it('should return 201 and user data on successful signup', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'test@example.com', password: 'password123' },
      });
      const res = httpMocks.createResponse();
      (axios.post as jest.Mock)
        .mockResolvedValueOnce({}) // signup
        .mockResolvedValueOnce({ data: { access_token: fakeToken } }); // token
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: fakeUserInfo });
      await signup(req, res);
      expect(res.statusCode).toBe(201);
      const data = res._getJSONData();
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('token', fakeToken);
    });
  });

  describe('login', () => {
    it('should return 200 and token on successful login', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'test@example.com', password: 'password123' },
      });
      const res = httpMocks.createResponse();
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { access_token: fakeToken } });
      await login(req, res);
      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('token', fakeToken);
    });
  });
});
