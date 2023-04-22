function authorization(req, res, next) {
  const paramUserID = req.USER_ID;
  const userID = req.USER.id;
  console.log(paramUserID, userID);

  if (paramUserID === userID) {
    return next();
  }
  return res.status(403).json({ error: 'no estas autorizado' });
}

module.exports = authorization;
