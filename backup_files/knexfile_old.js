const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;

const dbConfig = {
  development: {
    client: "pg",
    connection: {
      database: "book_database",
      username: "tom",
      password: "password",
    },
    seeds: {
      directory: "./db/seeds/",
    },
  },
  test: {
    client: "pg",
    connection: {
      database: "book_database_test",
      username: "tom",
      password: "password",
    },
    seeds: {
      directory: "./db/seeds/",
    },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    client: "pg",
    seeds: {
      directory: "./db/seeds/",
    },
  },
};

module.exports = dbConfig[ENV];
