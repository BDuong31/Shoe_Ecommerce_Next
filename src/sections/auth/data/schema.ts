import { z } from 'zod';

// ----------------------------------------------------------------------

export const loginSchema = z.object({
  email: z
    .string()
    .min(0, { message: 'Email address is required'})
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(30, { message: 'Password must be at most 30 characters long' }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters long' })
    .max(30, { message: 'Full name must be at most 30 characters long' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' }),
  gender: z
    .string()
    .nonempty({ message: 'Gender is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(30, { message: 'Password must be at most 30 characters long' }),
});

export type RegisterData = z.infer<typeof registerSchema>;
