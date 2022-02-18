const {
  NODE_ENV,
  PORT,
  HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DIALECT,
  API_VERSION,
  API_KEY,
  VERIFY_TOKEN_FB,
  ACCESS_TOKEN_FB,
} = process.env;

export default {
  apiVersion: API_VERSION,
  isProduction: NODE_ENV === "true",
  port: PORT,
  host: HOST,
  pg_db: POSTGRES_DB,
  pg_user: POSTGRES_USER,
  pg_password: POSTGRES_PASSWORD,
  pg_host: POSTGRES_HOST,
  pg_dialect: POSTGRES_DIALECT,
  apiKey: API_KEY,
  verifyTokenFb: VERIFY_TOKEN_FB,
  accessTokenFb: ACCESS_TOKEN_FB,
};
