import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const downloadDir = path.resolve('testData');

// Ensure download folder exists
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

test('Download multiple files asynchronously while timers run', async ({ page }) => {

  // Timer event to simulate other "tasks" happening
  const timer = setInterval(() => {
    console.log('Timer tick:', new Date().toLocaleTimeString());
  }, 1000);

  // Function to download a file using async/await
  async function downloadFile(fileSelector: string): Promise<string> {
    const [download] = await Promise.all([
      page.waitForEvent('download'), // listen first
      page.click(fileSelector)        // trigger download
    ]);

    const fileName = download.suggestedFilename();
    const filePath = path.join(downloadDir, fileName);

    // Await ensures the file is saved before continuing
    await download.saveAs(filePath);
    console.log(`Downloaded: ${fileName}`);
    return filePath;
  }

  // Navigate to demo page
  await page.goto('https://demoqa.com/upload-download');

  // Start first download
  const downloadPromise1 = downloadFile('#downloadButton');

  // Start second download after 2 seconds (simulating another request)
  const downloadPromise2 = new Promise<string>(resolve => {
    setTimeout(async () => {
      const filePath = await downloadFile('#downloadButton');
      resolve(filePath);
    }, 2000);
  });

  // Wait for both downloads to complete
  const results = await Promise.all([downloadPromise1, downloadPromise2]);
  console.log('Both downloads completed:', results);

  clearInterval(timer); // stop the timer
});
