const DBSOURCE = './todos.sqlite';

const betterSqlite3 = require('better-sqlite3');
const db = betterSqlite3(DBSOURCE);

function all() {
  const stm = db.prepare('SELECT * FROM todos_tags');
  const rows = stm.all();
  return rows;
}

module.exports = {
  all,
};
