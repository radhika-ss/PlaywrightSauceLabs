import { BasePage } from "../base.page";
import { Page } from '@playwright/test'

export class FramesPage extends BasePage {
    frame1Locator: string;
    frame2Locator: string;
    parentFrameLocator: string;

    constructor(page: Page) {
        super(page);

        this.frame1Locator = 'iframe#frame1';
        this.frame2Locator = 'iframe#frame2';
        this.parentFrameLocator = 'iframe#frame1';
    }

    frame1 = () =>
        this.page.frameLocator('iframe#frame1');

    frame2 = () =>
        this.page.frameLocator('iframe#frame2');

    frame1Heading = () =>
        this.frame1().locator('#sampleHeading');

    frame2Heading = () =>
        this.frame2().locator('#sampleHeading');

    parentFrame = () =>
        this.page.frameLocator(this.parentFrameLocator);

    childFrame = () =>
        this.parentFrame().frameLocator('iframe');

    parentText = () =>
        this.parentFrame().locator('body');

    childText = () =>
        this.childFrame().locator('body');
}
