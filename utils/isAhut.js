
const { error } = require("@hapi/joi/lib/base");
const { tokenVerify } = require("../utils/verifyToken");
const isAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    let error = new Error("acceso denegado");
    error.status = 403;
    return next(error);
  }
  const token = req.headers.authorization.split(" ").pop();
  const validToken = await tokenVerify(token);
  if (validToken instanceof Error) {
    error.message = "Token expiro o invalido";
    error.status = 403;
    return next(error);
  }
  req.user = validToken;
  next();
};
module.exports = isAuth

/*function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403);
    jwt.verify(token, "secret_key", (err, user) => {
       if (err) return res.sendStatus(404);
       req.user = user;
       next();
    });
 }
 */
