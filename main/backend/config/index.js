require("dotenv").config({ path: "../../.env" });
const ENV_VARS = process.env;

const config = {
  db: {
    client: ENV_VARS.DEV_DB_CLIENT,
    host: ENV_VARS.DEV_DB_HOST,
    name: ENV_VARS.DEV_DB_NAME,
    user: ENV_VARS.DEV_DB_USER,
    password: ENV_VARS.DEV_DB_PASSWORD,
    min_pool: ENV_VARS.DEV_DB_MIN_POOL || 0,
    max_pool: ENV_VARS.DEV_DP_MAX_POOL || 2,
  },
  NODE_ENV: ENV_VARS.NODE_ENV || "development",
  PORT: ENV_VARS.PORT || 8000,
};

module.exports = config;
