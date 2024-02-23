const { User } = require("../service/Schemas/userSchema");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];

    try {
      const payload = jwt.verify(token, SECRET);
      const { id } = payload;
      const user = await User.findById({ _id: id });
      if (!user || user.token !== token) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  }
};

module.exports = auth;
