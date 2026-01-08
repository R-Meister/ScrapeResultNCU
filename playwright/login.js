import dotenv from 'dotenv';
import { SELECTORS } from '../PageObjects/selectors.js';

dotenv.config();

export async function login(page) {
  if (!process.env.LOGIN_EMAIL || !process.env.LOGIN_PASSWORD) {
    throw new Error("Missing LOGIN_EMAIL or LOGIN_PASSWORD in .env");
  }

  await page.goto('https://mycampus.ncuindia.edu/', {
    waitUntil: 'networkidle'
  });

  await page.fill(`xpath=${SELECTORS.login.emailInput}`, process.env.LOGIN_EMAIL);
  await page.fill(`xpath=${SELECTORS.login.passwordInput}`, process.env.LOGIN_PASSWORD);

  await Promise.all([
    page.click(`xpath=${SELECTORS.login.loginButton}`),
    page.waitForNavigation({ waitUntil: 'networkidle' })
  ]);
}
