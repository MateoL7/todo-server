const betterSqlite3 = require('better-sqlite3');

const DBSOURCE = './todos.sqlite';

// const {
//   asyncAll,
//   asyncRemove,
//   asyncInsert,
//   asyncUpdate,
//   asyncItem,
// } = require('./database');
const db = require('./database');

// const db = betterSqlite3(DBSOURCE);

// new async/await syntax:
async function all(req, res) {
  try {
    const rows = await db.all();
    res.json(rows);
  } catch (ex) {
    res.status(500).json({ error: err });
  }
}

async function item(req, res) {
  try {
    const item = await db.item(req.params.id);
    res.status(200).json(item);
  } catch (ex) {
    res.status(500).json({ error: ex });
  }
  return;
}

async function insert(req, res) {
  try {
    const inserted = await db.insert(req.body.text);
    res.json(inserted);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function update(req, res) {
  try {
    const edited = await db.update(req.params.id, req.body.done);
    res.json(edited);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

function remove(req, res) {
  try {
    db.remove(req.params.id);
    res.status(200).json({});
  } catch (ex) {
    res.status(500).json({ error: ex });
  }
  return;
}

module.exports = {
  all,
  item,
  insert,
  update,
  remove,
};
