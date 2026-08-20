export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 2000,
};

const EMAIL_PATTERN =
  /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

function asTrimmedString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function characterCount(value) {
  return [...value].length;
}

export function normalizeContactFormValues(values = {}) {
  return {
    name: asTrimmedString(values.name),
    email: asTrimmedString(values.email),
    message: asTrimmedString(values.message),
  };
}

export function validateContactForm(values = {}) {
  const normalizedValues = normalizeContactFormValues(values);
  const errors = {};

  if (!normalizedValues.name) {
    errors.name = 'Full name is required.';
  } else if (characterCount(normalizedValues.name) < CONTACT_LIMITS.nameMin) {
    errors.name = `Full name must be at least ${CONTACT_LIMITS.nameMin} characters.`;
  } else if (characterCount(normalizedValues.name) > CONTACT_LIMITS.nameMax) {
    errors.name = `Full name must be ${CONTACT_LIMITS.nameMax} characters or less.`;
  }

  if (!normalizedValues.email) {
    errors.email = 'Email address is required.';
  } else if (characterCount(normalizedValues.email) > CONTACT_LIMITS.emailMax) {
    errors.email = `Email address must be ${CONTACT_LIMITS.emailMax} characters or less.`;
  } else if (!EMAIL_PATTERN.test(normalizedValues.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!normalizedValues.message) {
    errors.message = 'Message is required.';
  } else if (characterCount(normalizedValues.message) < CONTACT_LIMITS.messageMin) {
    errors.message = `Message must be at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (characterCount(normalizedValues.message) > CONTACT_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_LIMITS.messageMax} characters or less.`;
  }

  return {
    values: normalizedValues,
    errors,
    valid: Object.keys(errors).length === 0,
  };
}
