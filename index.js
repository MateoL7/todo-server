const express = require('express');
const cors = require('cors');
const { all, item, update, insert, remove } = require('./controller');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/todos', all);
app.post('/todos', insert);
app.get('/todos/:id', item);
app.delete('/todos/:id', remove);
app.put('/todos/:id', update);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});
