const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './todos.sqlite';

const {
  asyncAll,
  asyncRemove,
  asyncInsert,
  asyncUpdate,
  asyncItem,
} = require('./database');

const db = new sqlite3.Database(DBSOURCE, (err) => {
  // console.error(err);
});

// new async/await syntax:
async function all(req, res) {
  try {
    const rows = await asyncAll();
    res.json(rows);
  } catch (ex) {
    res.status(500).json({ error: err });
  }
}

async function item(req, res) {
  try {
    const row = await asyncItem(req.params.id);
    res.status(200).json(row);
  } catch (ex) {
    res.status(500).json({ error: ex });
  }
  return;
}

async function insert(req, res) {
  try {
    const inserted = await asyncInsert(req.body.text);
    res.json(inserted);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function update(req, res) {
  try {
    const edited = await asyncUpdate(req.body.done, req.params.id);
    res.json(edited);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function remove(req, res) {
  try {
    await asyncRemove(req.params.id);
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
