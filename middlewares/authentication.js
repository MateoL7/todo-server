function authentication(req, res, next) {
  const authHeader = req.header('Authorization');

  const token = authHeader.split(' ')[1];
  // console.log('token: ', token);

  const jwt = require('jsonwebtoken');

  try {
    const decoded = jwt.verify(token, process.env.PASSWORD_JWT);
    // console.log(decoded);
    req.USER = decoded;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'no tienes permiso' });
  }
}

module.exports = authentication;
