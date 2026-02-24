import {test, expect} from '../../fixtures/test-setup';
import { FileUtils } from '../../utils/FileUtils';

test.describe('Upload Download tests in DemoQA', ()=> {

    test.beforeEach(async ({uploadDownloadPage})=> {
        await uploadDownloadPage.goto();
    });
    
    test('upload file test', async({uploadDownloadPage}) => {
        const uploadedFileName = await uploadDownloadPage.uploadFile('testData/sample.txt');
        expect(uploadedFileName).toContain('sample.txt');
    });

    test('Download file test', async({uploadDownloadPage}) => {
      const downloadPath =  await uploadDownloadPage.downloadFile('testData/');
      expect(FileUtils.fileExists(downloadPath)).toBeTruthy();
    });
});
