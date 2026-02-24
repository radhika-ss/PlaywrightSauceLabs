import fs from 'fs';
import path from 'path';
import {Page} from '@playwright/test';

export class FileUtils {

    static resolvePath(relativePath: string): string {
       return path.resolve(relativePath);
    }

    static async uploadFile(page:Page, selector: string, filePath:string) {
        const absolutePath = this.resolvePath(filePath);
        await page.locator(selector).setInputFiles(absolutePath);
    }

    static async downloadFile1(page:Page, selector: string, saveAsPath:string ) {
        const absolutePath = this.resolvePath(saveAsPath);

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click(selector)
        ]);

       await download.saveAs(absolutePath);
       return absolutePath;
    }

    static async downloadFile(
    page: Page,
    selector: string,
    saveDir: string
  ): Promise<string> {

    const downloadDir = this.resolvePath(saveDir);

    // ✅ Ensure directory exists
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click(selector)
    ]);

    // ✅ Get actual filename from browser
    const fileName = download.suggestedFilename();

    // ✅ FULL file path (this was missing before)
    const filePath = path.join(downloadDir, fileName);

    await download.saveAs(filePath);

    return filePath;
  }

    static  fileExists(filePath: string): boolean {
        return fs.existsSync(FileUtils.resolvePath(filePath));
    }

    static readFileContent(filePath: string): string {
       return fs.readFileSync(FileUtils.resolvePath(filePath), 'utf-8');
    }
}
