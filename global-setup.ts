import { request } from "@playwright/test";
import { writeFile, existsSync, mkdirSync } from "fs";

async function globalSetup(): Promise<void> {
  const requestContext = await request.newContext();

  const { token } = await requestContext
    .post(`${process.env.API}/auth/v1/auth/`, {
      data: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
    })
    .then(async (body) => await body.json());

  const oneTimeUrl: string = await requestContext
    .get(`${process.env.API}/auth/v1/one-time-login-url/`, {
      headers: {
        authorization: token,
      },
    })

    .then(async (body) => await body.json())
    .then((res) => res.url.split("/").pop());

  // temporary loginToken
  const { loginToken } = await requestContext
    .get(`${process.env.API}/auth/v1/tokens/onetime/${oneTimeUrl}/exchange/`)
    .then(async (body) => await body.json());

  // userId
  const { _id } = await requestContext
    .get(`${process.env.API}/auth/v1/user/`, {
      headers: {
        authorization: token,
      },
    })
    .then(async (body) => await body.json());

  const authStorageState = {
    origins: [
      {
        origin: process.env.BASE_URL,
        localStorage: [
          {
            name: "Meteor.userId",
            value: _id,
          },
          {
            name: "Meteor.loginToken",
            value: loginToken,
          },
        ],
      },
    ],
  };

  if (!existsSync("fixtures")) mkdirSync("fixtures");
  writeFile("fixtures/authStorageState.json", JSON.stringify(authStorageState), () => null);

  await requestContext.dispose();
}

export default globalSetup;
