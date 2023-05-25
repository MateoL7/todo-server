require("dotenv").config();
const express = require("express");

const cors = require("cors");

const app = express();
const port = 3000;

const TTL_JWT = Number(process.env.TTL_JWT) ?? 10;

app.use(cors());
app.use(express.json());

// registrar usuario
app.post("/register", (req, res, next) => {
  const { login, password, nombre, email } = req.body;

  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const myPlaintextPassword = password;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      // Store hash in your password DB.

      const userDAO = require("./daos/users.dao");

      userDAO.insert({
        username: login,
        password: hash,
        name: nombre,
        email: email,
      });

      res.json(201).json({ mensaje: "usuario creado" });
    });
  });
});
// login

app.post("/login", (req, res, next) => {
  const { login, password } = req.body;

  const bcrypt = require("bcrypt");

  const userDAO = require("./daos/users.dao");

  const userFound = userDAO.getByUsername(login);

  //login incorrecto
  if (!userFound) return next("login incorrecto");

  if (bcrypt.compareSync(password, userFound.password)) {
    // login correcto

    // generar un token que voy a enviar a cliente.
    var jwt = require("jsonwebtoken");
    try {
      var token = jwt.sign(
        {
          id: userFound.id,
          name: userFound.name,
          exp: new Date() / 1000 + TTL_JWT,
        },
        process.env.PASSWORD_JWT
      );

      res.status(200).json({ token: token });
    } catch (ex) {
      console.log(ex);
    }
  } else {
    // login incorrecto
    return next("login incorrecto");
  }
});

const usersRouter = require("./routers/users.router.js");

app.use("/users", usersRouter);

app.all("*", (req, res) => {
  res.status(404).json({ error: "esta no es la página que estabas buscando" });
});

app.use((error, req, res, next) => {
  res.status(401).json({ message: error });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});
