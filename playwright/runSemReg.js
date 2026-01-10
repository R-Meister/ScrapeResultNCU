import { launchBrowser } from './browser.js';
import { login } from './login.js';
import { semesterRegistration } from './navigateSemReg.js';
import { SELECTORS } from '../PageObjects/selectors.js';
import dotenv from 'dotenv';

dotenv.config();

export async function runSemReg() {
    const { browser, page } = await launchBrowser();

    try {
        console.log('🔒 Logging in...');
        await login(page);

        console.log('🧭 Navigating to Semester Registration...');
        await semesterRegistration(page);

        // check if backlog exists
        const backlogCount = await page.locator(SELECTORS.semreg.backlogPresent).count();

        if (backlogCount > 0) {
            console.log('⚠️ Backlog Courses Present. Please check manually.');
        } else {
            await page.click(`xpath=${SELECTORS.semreg.submit}`);
            console.log('✅ No backlog. Submitted successfully.');
        }

    } catch (err) {
        console.error('❌ Registration failed:', err.message);
    } finally {
        await browser.close();
    }
}

// Allow running directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runSemReg();
}
