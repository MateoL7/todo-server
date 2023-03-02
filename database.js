const betterSqlite3 = require('better-sqlite3');

const DBSOURCE = './todos.sqlite';

const db = betterSqlite3(DBSOURCE);

function all() {
  const stm = db.prepare('SELECT * FROM todos');
  const rows = stm.all();
  return rows;
}
function remove(id) {
  const stm = db.prepare('REMOVE FROM todos WHERE id = ?');
  const rows = stm.run(id);
  return rows;
}
function item(id) {
  const stm = db.prepare('SELECT * FROM todos WHERE id = ?');
  const rows = stm.get(id);
  console.log('ROWS: ', rows);
  return rows;
}

function insert(text) {}

function update(id, done) {
  if (done) {
    done = 1;
  } else {
    done = 0;
  }
  const stm = db.prepare('UPDATE todos SET done = ? WHERE id = ?');
  const rows = stm.run(done, id);
  return rows;
}

module.exports = {
  all,
  remove,
  // insert,
  update,
  item,
};
