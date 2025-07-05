import request from 'supertest';
import express from 'express';
import routes from './routes';

// Mock controller functions
global.console = { ...console, error: jest.fn() };
jest.mock('./controller', () => ({
  signup: jest.fn((_, res) => res.status(201).json({ message: 'signed up' })),
  login: jest.fn((_, res) => res.status(200).json({ message: 'logged in' })),
}));

const app = express();
app.use(express.json());
app.use('/', routes);

describe('Auth Routes', () => {
  describe('signup', () => {
    it('should call signup controller and return 201 (happy path)', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: 'signed up' });
    });

    it('should return 400 for invalid email (unhappy path)', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ email: 'not-an-email', password: 'password123', name: 'Test User' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for missing password (unhappy path)', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ email: 'test@example.com' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for missing email (unhappy path)', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ password: 'password123' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('login', () => {
    it('should call login controller and return 200 (happy path)', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'logged in' });
    });

    it('should return 400 for missing email (unhappy path)', async () => {
      const res = await request(app)
        .post('/login')
        .send({ password: 'password123' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for missing password (unhappy path)', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@example.com' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
