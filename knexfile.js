const ENV = process.env.NODE_ENV || "development";

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
};

module.exports = dbConfig[ENV];
