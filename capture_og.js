
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to exact OG image size
    await page.setViewport({
        width: 1200,
        height: 630,
        deviceScaleFactor: 2, // High resolution for sharpness
    });

    const filePath = path.join(__dirname, 'og-image.html');
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

    await page.screenshot({ path: 'og-image.png' });

    await browser.close();
    console.log('OG Image saved to og-image.png');
})();
