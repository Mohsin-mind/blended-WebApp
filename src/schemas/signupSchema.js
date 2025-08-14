import { z } from 'zod';
import CONST from '@/utils/constant';
import { replacePlaceholder } from '@/utils/helper';

const {
  REQUIRED,
  FORMAT,
  EMAIL_REGEX,
  LENGTH,
  UPPERCASE,
  LOWERCASE,
  NUMBER,
  SPECIAL,
} = CONST.FORM_VALIDATION;

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: replacePlaceholder(REQUIRED, '<field_name>', 'First name'),
    })
    .min(2, { message: 'First name must be at least 2 characters long' }),
  lastName: z
    .string()
    .min(1, {
      message: replacePlaceholder(REQUIRED, '<field_name>', 'Last name'),
    })
    .min(2, { message: 'Last name must be at least 2 characters long' }),
  email: z
    .string()
    .min(1, { message: replacePlaceholder(REQUIRED, '<field_name>', 'Email') })
    .regex(EMAIL_REGEX, {
      message: replacePlaceholder(FORMAT, '<field_name>', 'email'),
    }),
  password: z
    .string()
    .min(1, {
      message: replacePlaceholder(REQUIRED, '<field_name>', 'Password'),
    })
    .min(8, replacePlaceholder(LENGTH, '<field_name>', 'Password'))
    .regex(/[A-Z]/, UPPERCASE) // At least one uppercase
    .regex(/[a-z]/, LOWERCASE) // At least one lowercase
    .regex(/[0-9]/, NUMBER) // At least one digit
    .regex(/[@$!%*?&#]/, SPECIAL),
});
