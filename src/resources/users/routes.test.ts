import request from 'supertest';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';

jest.mock('./controller', () => ({
  getUserById: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  updateUser: jest.fn((_, res) => res.status(200).json({ updated: true })),
  deleteUser: jest.fn((_, res) => res.status(204).send()),
}));

jest.mock('@src/middleware/require-self', () => ({
  requireSelf: (_: Request, __: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(express.json());
app.use('/', routes);

describe('User Routes', () => {
  it('GET /:id should call getUserById', async () => {
    const res = await request(app).get('/123');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: '123' });
  });

  it('PATCH /:id should call updateUser', async () => {
    const res = await request(app)
      .patch('/123')
      .send({ email: 'test@example.com' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ updated: true });
  });

  it('DELETE /:id should call deleteUser', async () => {
    const res = await request(app).delete('/123');
    expect(res.status).toBe(204);
  });

  it('PATCH /:id with invalid body should return 400', async () => {
    const res = await request(app)
      .patch('/123')
      .send({ email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
