const express = require('express');

const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const usersRouter = require('./routers/users.router.js');
const todosRouter = require('./routers/todos.router.js');

app.use('/users', usersRouter);
app.use('/todos', todosRouter);

app.all('*', (req, res) => {
  res.status(404).json({ error: 'esta no es la página que estabas buscando' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});
