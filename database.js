const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './todos.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  // console.error(err);
});

function asyncAll() {
  return new Promise((resolve, reject) => {
    const sql = 'select * from todos';
    // console.log(sql);
    const params = [];

    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(
        rows.map((row) => ({ ...row, text: row.todo, done: Boolean(row.done) }))
      );
    });
  });
}
function asyncRemove(id) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM todos WHERE ID = ?';
    const params = [id];

    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function asyncInsert(text) {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO todos (todo, done) VALUES ( '${text}' , false);`;
    console.log(sql);

    var params = [];

    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve({
        id: this.lastID,
        text: text,
        done: false,
      });
    });
  });
}

function asyncUpdate(done, id) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE TODOS SET done = ? WHERE ID = ?';
    const params = [done, id];

    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

module.exports = {
  asyncAll,
  asyncRemove,
  asyncInsert,
  asyncUpdate,
};
