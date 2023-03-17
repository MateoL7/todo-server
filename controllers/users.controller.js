// const { asyncAll, asyncRemove, asyncItem } = require("./database.js");
const db = require("../daos/users.dao.js");

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
    const row = await db.item(req.params.id);
    res.json(row);
  } catch (ex) {
    res.status(500).json({ error: ex });
  }
}

async function insert(req, res) {
  //   var sql = `INSERT INTO todos (todo, done) VALUES ( '${req.body.text}' , false);`;
  //   console.log(sql);
  //   var params = [];
  //   db.run(sql, params, function (err) {
  //     console.log(this);
  //     console.log(err);
  //     if (err) {
  //       console.log(err);
  //       res.status(400).json({ error: err.message });
  //       return;
  //     }
  //     res.json({
  //       id: this.lastID,
  //       text: req.body.text,
  //       done: false,
  //     });
  //   });
  res.json({});
}
// PUT /todos/4587487
// {
//   done: true;
// }
async function update(req, res) {
  try {
    const { id } = req.params;
    const { done } = req.body;

    await db.update(id, done);
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

module.exports = {
  all,
  item,
  insert,
  update,
  remove,
};
