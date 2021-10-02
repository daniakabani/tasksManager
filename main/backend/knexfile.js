const config = require("daniakabani/config");

const _config = {
  client: config.db.client,
  connection: async function () {
    return {
      host: config.db.host,
      database: config.db.name,
      user: config.db.user,
      password: config.db.password,
    };
  },
  pool: {
    min: Number(config.db.min_pool) || 0,
    max: Number(config.db.max_pool) || 1,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: __dirname + "/migrations",
  },
  seeds: {
    directory: __dirname + "/seeds",
  },
};

module.exports = _config;
