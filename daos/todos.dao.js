const DBSOURCE = './todos.sqlite';

const betterSqlite3 = require('better-sqlite3');
const db = betterSqlite3(DBSOURCE);

function all() {
  const stm = db.prepare('SELECT * FROM todos');
  const rows = stm.all();
  return transformarLaSalida(rows);
}

function allTodosByUser(id) {
  const stm = db.prepare('SELECT * FROM todos WHERE user_id = ?');
  const rows = stm.all(id);

  rows.map((row) => {
    const stmAllTags = db.prepare(
      'SELECT * from tags t WHERE t.id IN(Select tag_id from todos_tags where todo_id = ?)'
    );
    const allTags = stmAllTags.all(row.id);
    row.tags = allTags;
    // console.log(allTags);
  });
  // console.log(rows);
  // return [];
  return transformarLaSalida(rows);
}

function transformarLaSalida(rows) {
  const mappedRows = rows.map((elem) => {
    // const x = {...elem}

    // const nuevoElemento = {
    //   id: elem.id,
    //   todo: elem.todo,
    //   done: Boolean(elem.done),
    // };
    // return nuevoElemento;

    return {
      ...elem,
      done: Boolean(elem.done),
      text: `${elem.title}, ${elem.description}`,
    };
  });

  // const mappedRows = rows;

  return mappedRows;
}

function item(id) {
  const stm = db.prepare('SELECT * FROM todos WHERE id = ?');
  const row = stm.get(id);

  return transformarLaSalida([row])[0];
}

function insert(data) {
  const stm = db.prepare(
    'INSERT INTO todos(user_id,title, description, done) VALUES (?,?,?,?)'
  );
  const intDone = data.done ? 1 : 0;
  stm.run(data.user_id, data.title, data.description, intDone);
  return {};
}

function update(id, data) {
  // done es un boolean y en base de datos es un integer
  const intDone = data.done ? 1 : 0;
  const stm = db.prepare(
    'UPDATE todos SET user_id = ?, title = ?, description = ?,  done = ? WHERE id = ?'
  );
  const rows = stm.run(data.user_id, data.title, data.description, intDone, id);
  // Delete relationships
  const removeTagsStm = db.prepare('DELETE from todos_tags where todo_id = ?');
  removeTagsStm.run(id);
  // Create relationships
  const insertTagsStm = db.prepare(
    'INSERT INTO todos_tags(todo_id, tag_id) VALUES (?,?)'
  );
  data.tags.map((tag) => {
    insertTagsStm.run(id, tag.id);
  });
  return rows;
}

function remove(id) {
  const stm = db.prepare('DELETE FROM todos WHERE id = ?');
  const rows = stm.run(id);
  return rows;
}

module.exports = {
  all,
  allTodosByUser,
  insert,
  item,
  update,
  remove,
};
