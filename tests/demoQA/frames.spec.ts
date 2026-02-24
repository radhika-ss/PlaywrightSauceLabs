import { test, expect } from "../../fixtures/test-setup";

test.describe('Frames Module', () => {

    test.describe('Regular Frames', () => {

        test.beforeEach(async ({ framesPage }) => {
            await framesPage.navigate("https://demoqa.com/frames");
        });

        test('validating frame1 headline', async ({ framesPage }) => {
            await expect(framesPage.frame1Heading())
                .toHaveText("This is a sample page");
        });

        test('validating frame2 headline', async ({ framesPage }) => {
            await expect(framesPage.frame2Heading())
                .toHaveText("This is a sample page");
        });

    });

    test.describe('Nested Frames', () => {

        test.beforeEach(async ({ framesPage }) => {
            await framesPage.navigate("https://demoqa.com/nestedframes");
        });

        test("Validating nested parent frame", async ({ framesPage }) => {
            await expect(framesPage.parentText())
                .toHaveText("Parent frame");
        });

        test("Validating nested child frame", async ({ framesPage }) => {
            await expect(framesPage.childText())
                .toHaveText("Child Iframe");
        });

    });
});
