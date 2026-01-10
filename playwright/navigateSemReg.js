import { SELECTORS } from '../PageObjects/selectors.js';

export async function semesterRegistration(page) {
    await page.waitForSelector(`xpath=${SELECTORS.navigation.myLinks}`);
    await page.click(`xpath=${SELECTORS.navigation.myLinks}`);

    await page.waitForSelector(`xpath=${SELECTORS.navigation.academic}`);
    await page.click(`xpath=${SELECTORS.navigation.academic}`);

    await page.waitForSelector(`xpath=${SELECTORS.navigation.semesterRegistration}`);
    await page.click(`xpath=${SELECTORS.navigation.semesterRegistration}`);
}
