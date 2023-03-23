require('dotenv').config();
const express = require('express');

const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const bcrypt = require('bcrypt');

// registrar usuario
app.post('/register', (req, res, next) => {
  const { login, password, nombre, email } = req.body;

  const saltRounds = 10;
  const myPassword = password;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPassword, salt, function (err, hash) {
      //Store hash in your password DB.
      const userDAO = require('./daos/users.dao');
      userDAO.insert({
        username: login,
        password: hash,
        name: nombre,
        email: email,
      });
    });
  });
});

app.post('/login', (req, res, next) => {
  const { login, password } = req.body;

  const userDAO = require('./daos/users.dao');
  const userFound = userDAO.getByUsername(login);

  // Login incorrecto
  if (!userFound) return next('Login incorrecto');

  if (bcrypt.compareSync(password, userFound.password)) {
    // Login correcto

    // Generar token para mandar al cliente
    var jwt = require('jsonwebtoken');
    var token = jwt.sign(
      { id: userFound.id, name: userFound.name },
      process.env.PASSWORD_JWT
    );
    res.status(200).json({ token: token });
  } else {
    // Login incorrecto
    return next('Login incorrecto');
  }
});
const usersRouter = require('./routers/users.router.js');

app.use('/users', usersRouter);

app.all('*', (req, res) => {
  res.status(404).json({ error: 'esta no es la página que estabas buscando' });
});

app.use((error, req, res, next) => {
  res.status(401).json({ error: 'Login incorrecto' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});
