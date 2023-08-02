const { HOST, DB_HOST, DB_PORT, DB_USERNAME, DB_NAME, DB_PASSWORD, DB_TYPE } = process.env;

export default {
  port: HOST,
  postgresConfig: {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
};
