const FORM_VALIDATION = {
  REQUIRED: '<field_name> is required.',
  FORMAT: 'Enter valid <field_name>.',
  PASSWORD:
    'Password must be at least 8 characters long and contain at least one upper case letter and one number.',
  LENGTH: '<field_name> must be at least 8 characters.',
  UPPERCASE: 'Must contain at least one uppercase letter.',
  LOWERCASE: 'Must contain at least one lowercase letter.',
  NUMBER: 'Must contain at least one number.',
  SPECIAL: 'Must contain at least one special character.',
  MATCH: '<field_name> do not match.',
  OTP_DIGITS: 'OTP must be 5 digits.',
  OTP_NUMERIC: 'Only digits are allowed.',
  // Email regex that requires at least one uppercase letter
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export default FORM_VALIDATION;
