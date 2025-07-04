import userService, { sanitize } from './service';
import { User } from './types';

jest.mock('@src/db', () => ({
  db: {
    query: {
      users: {
        findMany: jest.fn().mockResolvedValue([{ id: '1', email: 'a@b.com', auth0Id: 'auth0|1' }]),
        findFirst: jest.fn().mockResolvedValue({ id: '1', email: 'a@b.com', auth0Id: 'auth0|1' }),
      },
    },
    insert: jest.fn(() => ({ values: jest.fn(() => ({ returning: jest.fn().mockResolvedValue([{ id: '2', email: 'c@d.com', auth0Id: 'auth0|2' }]) })) })),
    update: jest.fn(() => ({ set: jest.fn(() => ({ where: jest.fn(() => ({ returning: jest.fn().mockResolvedValue([{ id: '1', email: 'updated@b.com', auth0Id: 'auth0|1' }]) })) })) })),
    delete: jest.fn(() => ({ where: jest.fn(() => ({ returning: jest.fn().mockResolvedValue([{ id: '1', email: 'deleted@b.com', auth0Id: 'auth0|1' }]) })) })),
  },
}));

describe('userService', () => {
  it('sanitize removes auth0Id', () => {
    const user = { id: '1', email: 'a@b.com', auth0Id: 'auth0|1' } as User;
    expect(sanitize(user)).toEqual({ id: '1', email: 'a@b.com' });
  });

  it('findAll returns users', async () => {
    const users = await userService.findAll();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('a@b.com');
  });

  it('findById returns a user', async () => {
    const user = await userService.findById('1') as User;
    expect(user).toBeDefined();
    expect(user.email).toBe('a@b.com');
  });

  it('findByEmail returns a user', async () => {
    const user = await userService.findByEmail('a@b.com') as User;
    expect(user).toBeDefined();
    expect(user.email).toBe('a@b.com');
  });

  it('create returns new user', async () => {
    const [user] = await userService.create({ email: 'c@d.com', auth0Id: 'auth0|2' });
    expect(user).toBeDefined();
    expect(user.email).toBe('c@d.com');
  });

  it('update returns updated user', async () => {
    const [user] = await userService.update('1', { email: 'updated@b.com' });
    expect(user).toBeDefined();
    expect(user.email).toBe('updated@b.com');
  });

  it('delete returns deleted user', async () => {
    const [user] = await userService.delete('1');
    expect(user).toBeDefined();
    expect(user.email).toBe('deleted@b.com');
  });
});
