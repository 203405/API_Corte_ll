import pkg from "pg";
import { Sequelize } from "sequelize";
import { db } from "../config.js";
const { Pool } = pkg;

async function getConnection() {
  const client = new Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port,
  });
  await client.connect();
  return client;
}

const sequelizeClient = new Sequelize(db.database, db.user, db.password, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  host: db.host,
  dialect: "postgres",
});

sequelizeClient
  .authenticate()
  .then(() => {
    console.log("Conectado");
  })
  .catch(() => {
    console.log("No se conecto");
  });

export const getData = { getConnection, sequelizeClient };
