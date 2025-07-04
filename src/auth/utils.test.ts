import axios from 'axios';
import * as utils from './utils';

jest.mock('axios');

describe('Auth0 Utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getManagementToken', () => {
    it('should request a management token and return access_token', async () => {
      const token = 'test-token';
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { access_token: token } });
      const result = await utils.getManagementToken();
      expect(result).toBe(token);
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/oauth/token'),
        expect.objectContaining({ grant_type: 'client_credentials' })
      );
    });
  });

  describe('updateAuth0User', () => {
    it('should throw if updates is empty', async () => {
      await expect(utils.updateAuth0User('id', {})).rejects.toThrow('No updates provided');
    });
  });

  describe('deleteAuth0User', () => {
    it('should call axios.delete with correct URL and headers', async () => {
      const token = 'test-token';
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { access_token: token } });
      (axios.delete as jest.Mock).mockResolvedValueOnce({ data: { access_token: token } });
      await utils.deleteAuth0User('auth0|123');
      expect(axios.delete).toHaveBeenCalledWith(
        expect.stringContaining('/api/v2/users/auth0|123'),
        expect.objectContaining({ headers: { Authorization: `Bearer ${token}` } })
      );
    });
  });
});
