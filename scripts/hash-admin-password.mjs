import { randomBytes, scryptSync } from 'crypto';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const passwordArg = process.argv[2];
let password = passwordArg;

if (!password) {
  const readline = createInterface({ input, output });
  password = await readline.question('Admin password to hash: ');
  readline.close();
}

if (!password || password.length < 10) {
  console.error('Use a password with at least 10 characters.');
  process.exit(1);
}

const salt = randomBytes(16).toString('base64url');
const key = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 }).toString('base64url');

console.log(`BLOG_ADMIN_PASSWORD_HASH=scrypt$16384$8$1$${salt}$${key}`);
