// const { asyncAll, asyncRemove, asyncItem } = require("./database.js");
const db = require('../daos/todos.dao');

// new async/await syntax:
async function all(req, res) {
  try {
    const rows = await db.all();
    res.json(rows);
  } catch (ex) {
    res.status(500).json({ error: err });
  }
}

async function allTodosByUser(req, res, next) {
  try {
    const id = req.USER_ID;
    const rows = await db.allTodosByUser(id);
    res.json(rows);
  } catch (ex) {
    next(ex);
  }
}

async function item(req, res) {
  try {
    const row = await db.item(req.params.id);
    res.json(row);
  } catch (ex) {
    res.status(500).json({ error: ex });
  }
}

async function insert(req, res) {
  try {
    await db.insert(req.body);
    res.status(200).json({ Status: 'Inserted' });
  } catch (ex) {
    res.status(500).json({ error: ex });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    await db.update(id, req.body);
    res.status(200).json({});
  } catch (ex) {
    res.status(500).json({ error: ex });
  }

  return;
}

async function remove(req, res) {
  try {
    await db.remove(req.params.id);
    res.status(200).json({});
  } catch (ex) {
    res.status(500).json({ error: ex });
  }

  return;
}

// async function removeQString(req, res) {
//   try {
//     await db.remove(req.query.id);
//     res.status(200).json({});
//   } catch (ex) {
//     res.status(500).json({ error: ex });
//   }

//   return;
// }

module.exports = {
  all,
  allTodosByUser,
  item,
  insert,
  update,
  remove,
};
