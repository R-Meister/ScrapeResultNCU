import { SELECTORS } from '../PageObjects/selectors.js';

export async function extractSecret(page) {
  const linkXPath = `xpath=${SELECTORS.secret.downloadDgsLink}`;

  // Ensure link exists
  await page.waitForSelector(linkXPath);

  // Click the link (this triggers href update)
  await page.click(linkXPath);

  // Wait until href is populated (Angular async update)
  await page.waitForFunction(
    (xpath) => {
      const el = document
        .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
      return el && el.getAttribute('href') && el.getAttribute('href').length > 0;
    },
    SELECTORS.secret.downloadDgsLink
  );

  // Read updated href
  const href = await page.getAttribute(linkXPath, 'href');

  if (!href) {
    throw new Error('Download DGS href was not updated');
  }

  // Extract userId safely
  const match = href.match(/userId=([^&]+)/);

  if (!match) {
    throw new Error('userId not found in DGS URL');
  }

  return match[1]; // <-- ONLY the value you want
}
