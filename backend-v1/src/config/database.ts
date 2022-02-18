const Sequelize = require("sequelize");
import env from "./env";

// Postgresql
const sequelize = new Sequelize(env.pg_db, env.pg_user, env.pg_password, {
  host: env.pg_host,
  dialect: env.pg_dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

export default sequelize;
