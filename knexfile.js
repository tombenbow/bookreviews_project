const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'book_database',
      username: "tom",
      password: "password"
    }
  },
  test: {
    connection: {
      database: 'book_database_test',
      username: "tom",
      password: "password"
    }
  },
  production: {
    connection: {
        connectionString: DB_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      },
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };