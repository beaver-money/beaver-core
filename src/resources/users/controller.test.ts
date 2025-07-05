import * as controller from './controller';
import httpMocks from 'node-mocks-http';

jest.mock('@src/resources/users/service', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    update: jest.fn().mockResolvedValue([{ id: '1', email: 'updated@b.com', name: 'Test', auth0Id: 'auth0|1', createdAt: new Date(), updatedAt: new Date() }]),
    delete: jest.fn().mockResolvedValue([{ id: '1', email: 'deleted@b.com', name: 'Test', auth0Id: 'auth0|1', createdAt: new Date(), updatedAt: new Date() }]),
  },
  sanitize: (user: any) => user,
}));

jest.mock('@src/auth/utils', () => ({
  updateAuth0User: jest.fn(),
  deleteAuth0User: jest.fn(),
}));

jest.mock('@src/resources/accounts/service', () => ({
  __esModule: true,
  default: {
    findAccountsOwnedByUser: jest.fn().mockResolvedValue([]),
    deleteAccount: jest.fn().mockResolvedValue(undefined),
    findMembershipByUserId: jest.fn().mockResolvedValue([]),
    removeMembership: jest.fn().mockResolvedValue(undefined),
  },
}));

const userService = require('@src/resources/users/service').default;
const { updateAuth0User, deleteAuth0User } = require('@src/auth/utils');
const accountService = require('@src/resources/accounts/service').default;

const fakeUser = { id: '1', email: 'a@b.com', name: 'Test', auth0Id: 'auth0|1', createdAt: new Date(), updatedAt: new Date() };

describe('users controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return 200 and user if found', async () => {
      userService.findById.mockResolvedValue(fakeUser);
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      await controller.getUserById(req, res);
      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      expect(data).toEqual({
        ...fakeUser,
        createdAt: fakeUser.createdAt.toISOString(),
        updatedAt: fakeUser.updatedAt.toISOString(),
      });
    });
    it('should return 404 if not found', async () => {
      userService.findById.mockResolvedValue(undefined);
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      await controller.getUserById(req, res);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('updateUser', () => {
    it('should update user and Auth0 if found', async () => {
      userService.findById.mockResolvedValue(fakeUser);
      const req = httpMocks.createRequest({ params: { id: '1' }, body: { email: 'updated@b.com' } });
      const res = httpMocks.createResponse();
      await controller.updateUser(req, res);
      expect(updateAuth0User).toHaveBeenCalledWith('auth0|1', { email: 'updated@b.com' });
      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      // The mock for update returns a user with email 'updated@b.com' and new dates
      expect(data).toMatchObject({
        id: '1',
        email: 'updated@b.com',
        name: 'Test',
        auth0Id: 'auth0|1',
      });
      expect(typeof data.createdAt).toBe('string');
      expect(typeof data.updatedAt).toBe('string');
    });
    it('should return 404 if not found', async () => {
      userService.findById.mockResolvedValue(undefined);
      const req = httpMocks.createRequest({ params: { id: '1' }, body: { email: 'updated@b.com' } });
      const res = httpMocks.createResponse();
      await controller.updateUser(req, res);
      expect(res.statusCode).toBe(404);
    });
    it('should return 500 on error', async () => {
      userService.findById.mockResolvedValue(fakeUser);
      userService.update.mockRejectedValue(new Error('fail'));
      const req = httpMocks.createRequest({ params: { id: '1' }, body: { email: 'updated@b.com' } });
      const res = httpMocks.createResponse();
      await controller.updateUser(req, res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('deleteUser', () => {
    it('should delete user and Auth0 if found', async () => {
      userService.findById.mockResolvedValue(fakeUser);
      accountService.findAccountsOwnedByUser.mockResolvedValue([]); // No owned accounts
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      await controller.deleteUser(req, res);
      expect(deleteAuth0User).toHaveBeenCalledWith('auth0|1');
      expect(userService.delete).toHaveBeenCalledWith('1');
      expect(res.statusCode).toBe(204);
    });
    it('should delete user, Auth0, and owned accounts if found', async () => {
      userService.findById.mockResolvedValue(fakeUser);
      accountService.findAccountsOwnedByUser.mockResolvedValue([{ id: 'acc-1' }, { id: 'acc-2' }]);
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      await controller.deleteUser(req, res);
      expect(accountService.deleteAccount).toHaveBeenCalledWith('acc-1');
      expect(accountService.deleteAccount).toHaveBeenCalledWith('acc-2');
      expect(deleteAuth0User).toHaveBeenCalledWith('auth0|1');
      expect(userService.delete).toHaveBeenCalledWith('1');
      expect(res.statusCode).toBe(204);
    });
    it('should return 404 if not found', async () => {
      userService.findById.mockResolvedValue(undefined);
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      await controller.deleteUser(req, res);
      expect(res.statusCode).toBe(404);
    });
    it('should return 500 on error', async () => {
      userService.findById.mockResolvedValue(fakeUser);
      userService.delete.mockRejectedValue(new Error('fail'));
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      await controller.deleteUser(req, res);
      expect(res.statusCode).toBe(500);
    });
  });
});
