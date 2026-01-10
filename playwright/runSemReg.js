import { launchBrowser } from './browser.js';
import { login } from './login.js';
import { navigateToSemReg } from './navigateSemReg.js';
import { SELECTORS } from '../PageObjects/selectors.js';

const { browser, page } = await launchBrowser();

await login(page);
await navigateToSemReg(page);

// check if backlog exists
const backlogCount = await page.locator(SELECTORS.semreg.backlogPresent).count();

if (backlogCount > 0) {
    console.log('Backlog Courses Present. Please check manually.');
} else {
    await page.click(SELECTORS.semreg.submit);
    console.log('No backlog. Submitted successfully.');
}
