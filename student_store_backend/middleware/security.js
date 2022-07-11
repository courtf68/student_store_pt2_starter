const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnathorizedError } = require("../utils/errors");
//extract jwt from req
const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    //authorization: bearer sdfghj
    const [scheme, token] = headers.authorization.split(""); //destruct arr
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }
  return undefined;
};
//attacth user to res, more trad middleware
const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req); //if can take from header
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY); //attaching to res so anything else can access user here
    }
    return next();
  } catch (error) {
    return next();
  }
};
//verify user exists

const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    if (!user?.email) {
      //checking for emails
      throw new UnathorizedError();
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  jwtFrom,
  extractUserFromJwt,
  requireAuthenticatedUser,
};
