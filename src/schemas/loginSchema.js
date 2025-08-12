import { z } from 'zod';
import CONST from '@/utils/constant';
import { replacePlaceholder } from '@/utils/helper';

const { REQUIRED, FORMAT } = CONST.FORM_VALIDATION;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: replacePlaceholder(REQUIRED, '<field_name>', 'Email') })
    .regex(emailRegex, {
      message: replacePlaceholder(FORMAT, '<field_name>', 'email'),
    }),
  password: z.string().min(1, {
    message: replacePlaceholder(REQUIRED, '<field_name>', 'Password'),
  }),
});
