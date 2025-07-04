import { updateUserSchema } from './schema';

describe('updateUserSchema', () => {
  it('should allow valid email and name', () => {
    const input = { email: 'test@example.com', name: 'Test User' };
    expect(() => updateUserSchema.parse(input)).not.toThrow();
  });

  it('should allow partial (only email)', () => {
    const input = { email: 'test@example.com' };
    expect(() => updateUserSchema.parse(input)).not.toThrow();
  });

  it('should allow partial (only name)', () => {
    const input = { name: 'Test User' };
    expect(() => updateUserSchema.parse(input)).not.toThrow();
  });

  it('should fail for invalid email', () => {
    const input = { email: 'not-an-email' };
    expect(() => updateUserSchema.parse(input)).toThrow();
  });

  it('should fail for extra fields', () => {
    const input = { email: 'test@example.com', foo: 'bar' };
    expect(() => updateUserSchema.parse(input)).toThrow();
  });
});
