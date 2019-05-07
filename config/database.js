require("dotenv").config();

const config = {
  default: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  development: {
    extend: "default",
    database: process.env.DB_NAME || "backend_development"
  },
  test: {
    extend: "default",
    database: "backend_test"
  },
  production: {
    extend: "default",
    database: "backend_production"
  }
};

Object.keys(config).forEach(configKey => {
  const configValue = config[configKey];
  if (configValue.extend) {
    config[configKey] = Object.assign(
      {},
      config[configValue.extend],
      configValue
    );
  }
});

module.exports = config;
