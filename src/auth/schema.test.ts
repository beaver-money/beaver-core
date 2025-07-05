import { authSchema } from './schema';

describe('authSchema', () => {
  it('should validate a valid email and password', () => {
    const input = { email: 'test@example.com', password: 'password123', name: 'Test User' };
    expect(() => authSchema.parse(input)).not.toThrow();
  });

  it('should fail if email is invalid', () => {
    const input = { email: 'not-an-email', password: 'password123', name: 'Test User' };
    expect(() => authSchema.parse(input)).toThrow();
  });

  it('should fail if email is missing', () => {
    const input = { password: 'password123', name: 'Test User' };
    expect(() => authSchema.parse(input)).toThrow();
  });

  it('should fail if password is missing', () => {
    const input = { email: 'test@example.com', name: 'Test User' };
    expect(() => authSchema.parse(input)).toThrow();
  });

  it('should fail if password is not a string', () => {
    const input = { email: 'test@example.com', password: 12345, name: 'Test User' };
    expect(() => authSchema.parse(input)).toThrow();
  });
});
