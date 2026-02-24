//import {Page, Dialog} from '@playwright/test';

// export class AlertUtil {
//     constructor(private page: Page) {}

//     async handleAlert(
//         action: 'accept' | 'dismiss' = 'accept',
//         promptText?: string
//     ): Promise<void> {
//         this.page.once('dialog', async(dialog: Dialog) => {

//             console.log(`Alert type:' ${dialog.type()}`);
//             console.log(`Alert message: ${dialog.message()}`);

//             if(dialog.type() === 'prompt' && promptText ) {
//                 await dialog.accept(promptText);
//             } else if (dialog.type() === 'accept'){
//                 await dialog.accept();
//             } else {
//                 await dialog.dismiss();
//             }
//         })
//     }
// }

import { Page } from '@playwright/test';

export class AlertUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Handles any alert dynamically.
     * @param action 'accept' | 'dismiss' - default is 'accept'
     * @param promptText Optional text for prompt alerts
     */
    async handleAlert(action: 'accept' | 'dismiss' = 'accept', promptText?: string): Promise<void> {
        // Return a promise to ensure the test waits until alert is handled
        await new Promise<void>((resolve) => {

            this.page.once('dialog', async (dialog) => {
                // 1️⃣ Log type and message
                console.log(`Alert Type: '${dialog.type()}'`);
                console.log(`Alert Message: ${dialog.message()}`);

                // 2️⃣ Handle prompt alert
                if (dialog.type() === 'prompt' && promptText !== undefined) {
                    await dialog.accept(promptText);
                } 
                // 3️⃣ Accept / Dismiss other alerts
                else if (action === 'accept') {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }

                // 4️⃣ Resolve after handling
                resolve();
            });

        });
    }
}
