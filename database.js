const { resolve } = require('path');

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
    const sqlGet = 'SELECT * FROM TODOS WHERE id = ?';
    const params = [done, id];
    db.get(sqlGet, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      db.run(sql, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: row.id, text: row.todo, done: done });
      });
    });
  });
}

function asyncItem(id) {
  return new Promise((resolve, reject) => {
    const sql = 'select * from todos where id = ?';
    // console.log(sql);
    const params = [id];
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

module.exports = {
  asyncAll,
  asyncRemove,
  asyncInsert,
  asyncUpdate,
  asyncItem,
};
