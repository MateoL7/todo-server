function autorizacion(req, res, next) {
  const paramUserId = req.USER_ID;
  const userID = req.USER.id;

  console.log(paramUserId, userID);

  if (paramUserId === userID) return next();

  return res.status(403).json({ error: "no estas autorizado" });
}

module.exports = autorizacion;
