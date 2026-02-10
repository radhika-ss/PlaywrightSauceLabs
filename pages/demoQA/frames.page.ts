import { BasePage } from  "../base.page";
import {Page, expect} from '@playwright/test'

export class FramesPage extends BasePage {
    frame1Locator: string;
    frame2Locator: string;

    constructor(page: Page) {
        super(page);

        this.frame1Locator = 'iframe#frame1';
        this.frame2Locator = 'iframe#frame2';
    }

    async getFrame1Text(): Promise<string> {
       const frame1 = await this.getFrameLocator(this.frame1Locator);
       const text =   await frame1.locator('h1#sampleHeading').textContent();
       return text ?? '';
    }

    async getFrame2Text(): Promise<string> {
        const frame2 = await this.getFrameLocator(this.frame2Locator);
        const text = await frame2.locator('h1#sampleHeading').textContent();
        return text ?? '';
    }
 }
