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

function insert(data) {
  //
  const stm = db.prepare(
    'INSERT INTO users (username, password, name, email) VALUES (?,?,?,?)'
  );
  const result = stm.run(data.username, data.password, data.name, data.email);
  return result;
}

function update(id, data) {
  // done es un boolean y en base de datos es un integer
  const stm = db.prepare(
    'UPDATE users SET username = ?, password = ?, name = ?, email = ? WHERE id = ?'
  );
  const rows = stm.run(data.username, data.password, data.name, data.email, id);
  return rows;
}

function remove(id) {
  const stm = db.prepare('DELETE FROM users WHERE id = ?');
  const rows = stm.run(id);
  return rows;
}

module.exports = {
  all,
  insert,
  item,
  update,
  remove,
};
