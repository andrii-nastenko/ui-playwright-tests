import { request } from '@playwright/test';

// Login with API

async function globalSetup() {
  const requestContext = await request.newContext();

  const { token } = await requestContext
    .post(`${process.env.API}/auth/v1/auth/`, {
      data: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      }
    })
    .then((body) => body.json());

  const oneTimeUrl = await requestContext
    .get(`${process.env.API}/auth/v1/one-time-login-url/`, {
      headers: {
        authorization: token
      }
    })
    .then((body) => body.json())
    .then((res) => res.url.split('/').pop());

  const { loginToken } = await requestContext
    .get(`${process.env.API}/auth/v1/tokens/onetime/${oneTimeUrl}/exchange/`)
    .then((body) => body.json());

  console.log(loginToken);

  await requestContext.storageState({ path: 'fixtures/storageState.json' });
  await requestContext.dispose();
}

export default globalSetup;
