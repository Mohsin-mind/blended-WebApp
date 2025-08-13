import { z } from 'zod';
import CONST from '@/utils/constant';
import { replacePlaceholder } from '@/utils/helper';

const { REQUIRED, FORMAT, PASSWORD } = CONST.FORM_VALIDATION;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: replacePlaceholder(REQUIRED, '<field_name>', 'First name') })
    .min(2, { message: 'First name must be at least 2 characters long' }),
  lastName: z
    .string()
    .min(1, { message: replacePlaceholder(REQUIRED, '<field_name>', 'Last name') })
    .min(2, { message: 'Last name must be at least 2 characters long' }),
  email: z
    .string()
    .min(1, { message: replacePlaceholder(REQUIRED, '<field_name>', 'Email') })
    .regex(emailRegex, {
      message: replacePlaceholder(FORMAT, '<field_name>', 'email'),
    }),
  password: z
    .string()
    .min(1, { message: replacePlaceholder(REQUIRED, '<field_name>', 'Password') })
    .regex(passwordRegex, {
      message: PASSWORD,
    }),
});
