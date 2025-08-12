import { z } from 'zod';
import CONST from '@/utils/constant';
import { replacePlaceholder } from '@/utils/helper';

const { REQUIRED, LENGTH, UPPERCASE, LOWERCASE, NUMBER, SPECIAL, MATCH } =
  CONST.FORM_VALIDATION;

export const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(1, replacePlaceholder(REQUIRED, '<field_name>', 'Old password')),
    new_password: z
      .string()
      .min(1, replacePlaceholder(REQUIRED, '<field_name>', 'New password'))
      .regex(/[A-Z]/, UPPERCASE)
      .regex(/[a-z]/, LOWERCASE)
      .regex(/[0-9]/, NUMBER)
      .regex(/[^A-Za-z0-9]/, SPECIAL)
      .min(8, replacePlaceholder(LENGTH, '<field_name>', 'New password')),

    confirm_password: z.string(),
  })
  .refine(data => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: replacePlaceholder(MATCH, '<field_name>', 'Confirm Password'),
  });
