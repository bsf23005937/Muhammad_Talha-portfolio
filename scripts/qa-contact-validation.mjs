import assert from 'node:assert/strict';
import { CONTACT_LIMITS, validateContactForm } from '../lib/contactValidation.mjs';

const validBase = {
  name: 'Muhammad Talha',
  email: 'talha@example.com',
  message: 'I want to discuss a business workflow project.',
};

const invalidEmailCases = ['abc', 'abc@', 'abc@domain', 'abc@@gmail.com', 'test@.'];
const validMessageCases = [
  '<script>alert("test")</script> Please treat this as plain text.',
  "' OR '1'='1 — please treat this as plain text.",
  'Unicode and emoji test: سلام دنیا 🚀',
  'Line one\nLine two\nLine three',
];

function expectInvalid(label, values, field) {
  const result = validateContactForm(values);
  assert.equal(result.valid, false, `${label} should be invalid`);
  assert.ok(result.errors[field], `${label} should flag ${field}`);
}

function expectValid(label, values) {
  const result = validateContactForm(values);
  assert.equal(result.valid, true, `${label} should be valid: ${JSON.stringify(result.errors)}`);
}

expectInvalid('empty form', { name: '', email: '', message: '' }, 'name');
expectInvalid('one field only', { name: 'Talha', email: '', message: '' }, 'email');
expectInvalid('whitespace only', { name: '   ', email: '   ', message: '   ' }, 'name');
expectInvalid('minimum name too short', { ...validBase, name: 'A' }, 'name');
expectInvalid('minimum message too short', { ...validBase, message: 'short' }, 'message');
expectInvalid('very long name', { ...validBase, name: 'A'.repeat(CONTACT_LIMITS.nameMax + 1) }, 'name');
expectInvalid('very long email', { ...validBase, email: `${'a'.repeat(CONTACT_LIMITS.emailMax)}@example.com` }, 'email');
expectInvalid('very long message', { ...validBase, message: 'A'.repeat(CONTACT_LIMITS.messageMax + 1) }, 'message');

for (const email of invalidEmailCases) {
  expectInvalid(`malformed email ${email}`, { ...validBase, email }, 'email');
}

for (const message of validMessageCases) {
  expectValid(`safe plain-text message ${message.slice(0, 16)}`, { ...validBase, message });
}

expectValid('trimmed valid values', {
  name: '  Muhammad Talha  ',
  email: '  talha@example.com  ',
  message: '  I want a reliable portfolio contact workflow.  ',
});

console.log('Contact validation QA passed.');
