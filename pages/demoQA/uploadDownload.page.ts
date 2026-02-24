import { Page, Locator } from '@playwright/test';
import { FileUtils } from '../../utils/FileUtils';
import { BasePage } from '../base.page';

export class UploadDownloadPage extends BasePage {
    //readonly page: Page;
    readonly downloadButton = '#downloadButton';
    readonly uploadInput = '#uploadFile';
    readonly uploadedFileName = '#uploadedFilePath';

    elements = () => this.page.getByRole('link', { name: 'Elements' })
    uploadAndDownload = () => this.page.getByRole('link', { name: 'Upload and Download' });

    constructor(page: Page) {
        super(page);
    }

    // Safe click helper: removes ads and waits for element
    async safeClick(locator: Locator) {
        // Remove ads before interaction
        await this.removeAdsIfExist();

        // Wait for element readiness
        await this.expectClickable(locator);

        // Ensure no vignette navigation is active
        //await this.page.waitForFunction(() => !window.location.hash.includes('google_vignette'));
        await this.removeAdsIfExist();

        // Force click if overlay intercepts pointer events
        await locator.click({ trial: true }); // verifies clickability
        await locator.click();
    }

    async goto() {
        await this.page.goto('https://demoqa.com/');
        //this.elements().click();
        //this.uploadAndDownload().click();
        this.safeClick(this.elements());
        this.safeClick(this.uploadAndDownload());
    }

    async uploadFile(filePath: string) {
        await FileUtils.uploadFile(this.page, this.uploadInput, filePath);
        return await this.page.locator(this.uploadedFileName).textContent();
    }

    async downloadFile(saveAsPath: string) {
        return await FileUtils.downloadFile(this.page, this.downloadButton, saveAsPath);
    }
}
