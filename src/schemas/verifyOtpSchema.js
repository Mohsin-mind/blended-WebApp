import { z } from 'zod';
import CONST from '@/utils/constant';
import { replacePlaceholder } from '@/utils/helper';

const { REQUIRED, OTP_DIGITS, OTP_NUMERIC } = CONST.FORM_VALIDATION;

export const verifyOtpSchema = z.object({
  code: z
    .string()
    .nonempty({
      message: replacePlaceholder(REQUIRED, '<field_name>', 'OTP'),
    })
    .length(5, { message: OTP_DIGITS })
    .regex(/^\d+$/, { message: OTP_NUMERIC }),
});
