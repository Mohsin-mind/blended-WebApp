import { z } from 'zod';
import CONST from '@/utils/constant';
import { replacePlaceholder } from '@/utils/helper';

const { REQUIRED, FORMAT, EMAIL_REGEX } = CONST.FORM_VALIDATION;
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: replacePlaceholder(REQUIRED, '<field_name>', 'Email') })
    .regex(EMAIL_REGEX, {
      message: replacePlaceholder(FORMAT, '<field_name>', 'email'),
    }),
});
