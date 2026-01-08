import { SELECTORS } from '../PageObjects/selectors.js';

export async function navigateToSecretPane(page) {
  await page.waitForSelector(`xpath=${SELECTORS.navigation.myLinks}`);
  await page.click(`xpath=${SELECTORS.navigation.myLinks}`);

  await page.waitForSelector(`xpath=${SELECTORS.navigation.examination}`);
  await page.click(`xpath=${SELECTORS.navigation.examination}`);

  await page.waitForSelector(`xpath=${SELECTORS.navigation.result}`);
  await page.click(`xpath=${SELECTORS.navigation.result}`);
}
