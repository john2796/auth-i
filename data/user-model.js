const db = require("./dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db.select("id", "username", "password").from("users");
}

function findBy(filter) {
  return db
    .select()
    .from("users")
    .where(filter)
    .first();
}

async function add(user) {
  const [id] = await db.insert(user).into("users");
  return findById(id);
}

function findById(id) {
  return db
    .select()
    .from("users")
    .where({ id })
    .first();
}
