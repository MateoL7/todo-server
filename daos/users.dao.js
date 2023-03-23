const DBSOURCE = './todos.sqlite';

const betterSqlite3 = require('better-sqlite3');
const db = betterSqlite3(DBSOURCE);

function all() {
  const stm = db.prepare('SELECT * FROM users');
  const rows = stm.all();

  return rows;
}

function item(id) {
  const stm = db.prepare('SELECT * FROM users WHERE id = ?');
  const rows = stm.get(id);
  return rows;
}

function getByUsername(username) {
  const stm = db.prepare('SELECT * FROM users WHERE username = ?');
  const userFound = stm.get(username);
  return userFound;
}

function insert(data) {
  //
  const stm = db.prepare(
    'INSERT INTO users (username, password, name, email) VALUES (?,?,?,?)'
  );
  const result = stm.run(data.username, data.password, data.name, data.email);
  return result;
}

function update(id, done) {
  // done es un boolean y en base de datos es un integer
  const intDone = done ? 1 : 0;
  const stm = db.prepare('UPDATE todos SET done = ? WHERE id = ?');
  const rows = stm.run(intDone, id);
  return rows;
}

function remove(id) {
  const stm = db.prepare('DELETE FROM todos WHERE id = ?');
  const rows = stm.run(id);
  return rows;
}

module.exports = {
  all,
  insert,
  item,
  update,
  remove,
  getByUsername,
};
