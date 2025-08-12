import { z } from 'zod';
import CONST from '@/utils/constant';
import { replacePlaceholder } from '@/utils/helper';

const { LENGTH, UPPERCASE, LOWERCASE, NUMBER, SPECIAL, MATCH } =
  CONST.FORM_VALIDATION;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, replacePlaceholder(LENGTH, '<field_name>', 'New password'))
      .regex(/[A-Z]/, UPPERCASE)
      .regex(/[a-z]/, LOWERCASE)
      .regex(/[0-9]/, NUMBER)
      .regex(/[@$!%*?&#]/, SPECIAL),
    confirm_password: z.string(),
  })
  .refine(data => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: replacePlaceholder(MATCH, '<field_name>', 'Confirm password'),
  });
