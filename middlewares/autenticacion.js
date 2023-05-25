function autenticacion(req, res, next) {
  const authHeader = req.header("Authorization");
  // console.log(authHeader);
  // try {
  //   const token = authHeader.split(" ")[1];
  //   console.log(token);
  // } catch (ex) {
  //   console.log(ex);
  // }
  const token = authHeader.split(" ")[1];

  const jwt = require("jsonwebtoken");

  // verify a token symmetric - synchronous
  try {
    const decoded = jwt.verify(token, process.env.PASSWORD_JWT);
    // console.log(decoded); // bar
    req.USER = decoded;
    return next();
  } catch (ex) {
    console.log(ex);
    return res.status(401).json({ error: "no tienes permisos" });
  }
}

module.exports = autenticacion;
