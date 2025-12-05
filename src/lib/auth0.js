import { Auth0Client } from "@auth0/nextjs-auth0/server";

const {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_SECRET,
  APP_BASE_URL,
} = process.env;

if (
  !AUTH0_DOMAIN ||
  !AUTH0_CLIENT_ID ||
  !AUTH0_CLIENT_SECRET ||
  !AUTH0_SECRET ||
  !APP_BASE_URL
) {
  throw new Error(
    "Missing Auth0 env vars: AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_SECRET, APP_BASE_URL"
  );
}

export const auth0 = new Auth0Client({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  secret: AUTH0_SECRET,
  appBaseUrl: APP_BASE_URL,
});
