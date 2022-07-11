const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (data) =>
  jwt.sign(data, SECRET_KEY, { expiresIn: "24h" });
//{algorithm: "HS256", expiresIn:1000}
const createUserJwt = (user) => {
  const payload = {
    //   const user = { email: "person@gmail.com" };
    email: user.email,
    isAdmin: user.isAdmin || false,
  };
  return generateToken(payload);
  //   const token = generateToken(user);
  //   console.log("token", token);
  //   const val = validateToken(token);
  //   console.log("val token", val);
};
const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    return {};
  }
};
module.exports = {
  generateToken,
  validateToken,
  createUserJwt,
};
