import fs from 'fs';
import path from 'path';
import { Page, Route, Request } from '@playwright/test';

export type MockScenario = {
  requestFile: string;
  responseFile?: string;
  status: number;
  delay?: number;
  forceNetworkError?: boolean;
};

/**
 * Read JSON file and return object
 */
function readJson(filePath: string) {
  const fullPath = path.resolve(__dirname, '..', filePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

/**
 * Mock a single API scenario
 */
async function mockSingleApi(page: Page, scenario: MockScenario) {
  const requestConfig: { url: string; method: string; body?: any } =
    readJson(scenario.requestFile);

  await page.route(requestConfig.url, async (route: Route) => {
    const request: Request = route.request();

    console.log('Intercepted request:', request.url());
    console.log('Method:', request.method());

    // Match HTTP method
    if (request.method() !== requestConfig.method) {
      return route.continue();
    }

    // Only check body if POST/PUT and body exists
    if (
      requestConfig.body &&
      request.postDataJSON() &&
      request.method() !== 'GET'
    ) {
      const actualBody = request.postDataJSON();
      if (JSON.stringify(actualBody) !== JSON.stringify(requestConfig.body)) {
        return route.continue();
      }
    }

    // Network failure scenario
    if (scenario.forceNetworkError) {
      return route.abort();
    }

    // API delay scenario
    if (scenario.delay) {
      await new Promise((res) => setTimeout(res, scenario.delay));
    }

    // Prepare response body
    const responseBody =
      scenario.status === 204 || !scenario.responseFile
        ? undefined
        : scenario.responseFile
        ? JSON.stringify(readJson(scenario.responseFile))
        : '{}';

    await route.fulfill({
      status: scenario.status,
      contentType: 'application/json',
      body: responseBody,
    });
  });
}

/**
 * Mock multiple APIs
 */
export async function mockApis(page: Page, scenarios: MockScenario[]) {
  for (const scenario of scenarios) {
    await mockSingleApi(page, scenario);
  }
}
