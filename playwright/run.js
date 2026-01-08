import { launchBrowser } from './browser.js';
import { login } from './login.js';
import { navigateToSecretPane } from './navigate.js';
import { extractSecret } from './extractsecret.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

function secretAlreadyExists() {
  return process.env.SECRET_URL && process.env.SECRET_URL.trim().length > 0;
}

function updateEnv(key, value) {
  let env = fs.readFileSync('.env', 'utf8');
  const regex = new RegExp(`^${key}=.*`, 'm');

  if (env.match(regex)) {
    env = env.replace(regex, `${key}=${value}`);
  } else {
    env += `\n${key}=${value}`;
  }

  fs.writeFileSync('.env', env);
}

(async () => {

  if (secretAlreadyExists()) {
    console.log('ℹ️ Secret already present — skipping Playwright');
    return;
  }

  const { browser, page } = await launchBrowser();

  try {
    await login(page);
    await navigateToSecretPane(page);

    const secret = await extractSecret(page);
    updateEnv('SECRET_URL', secret);

    console.log('✅ Secret updated locally');
  } catch (err) {
    console.error('❌ Automation failed:', err.message);
  } finally {
    await browser.close();
  }
})();
