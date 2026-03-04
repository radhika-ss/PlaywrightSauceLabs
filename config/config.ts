import * as dotenv from 'dotenv';
dotenv.config(); // load variables from .env

type EnvType = 'dev' | 'staging' | 'prod';

export const environments: Record<EnvType, {baseURL: string}> = {
  dev: {
    baseURL: 'https://restful-booker.herokuapp.com',
  },
  staging: {
    baseURL: 'https://staging-restful-booker.herokuapp.com',

  },
  prod: {
    baseURL: 'https://prod-restful-booker.herokuapp.com',
  },
};

export function getEnvironment(env: EnvType = (process.env.TEST_ENV as EnvType) || 'dev') {
  return environments[env];
}

//Helper to get current env URL
export function getCredentials(env: EnvType = (process.env.TEST_ENV as EnvType)) {
  switch (env) {
    case 'staging':
      return { username: process.env.STAGING_USERNAME || '', password: process.env.STAGING_PASSWORD || ''};
    case 'prod':
      return { username: process.env.PROD_USERNAME || '', password: process.env.PROD_PASSWORD || ''};
    case 'dev':
    default:
      return { username: process.env.DEV_USERNAME || '', password: process.env.DEV_PASSWORD || ''};
  }
}
