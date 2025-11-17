import { z } from 'zod';

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: 'Current password must be at least 6 characters long' })
    .max(30, { message: 'Current password must be at most 30 characters long' }),
  newPassword: z
    .string()
    .min(6, { message: 'New password must be at least 6 characters long' })
    .max(30, { message: 'New password must be at most 30 characters long' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Confirm password must be at least 6 characters long' })
    .max(30, { message: 'Confirm password must be at most 30 characters long' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'New password and confirm password do not match',
  path: ['passwordMismatch'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'New password must be different from current password',
  path: ['currentPasswordMismatch'],
});

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;