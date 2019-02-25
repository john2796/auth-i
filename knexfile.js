// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/auth.sqlite3"
    },
    migrations: {
      filename: "./data/migrations"
    },
    useNullAsDefault: true
  }
};
