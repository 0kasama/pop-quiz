const { verifyToken } = require("../libs/jwt");
const { users } = require("../models");

const authentication = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const accessToken = req.headers.authorization.split(" ")[1];
      const { id, email } = verifyToken(accessToken);

      const user = await users.findOne({
        where: { id },
      });

      if (user) {
        req.loggedUser = {
          id: user.id,
          email: user.email,
          role: user.role
        };
        return next();
      } else {
        throw { name: "Unauthenticated", message: "User not found" };
      }
    } else {
      throw {
        name: "Unauthenticated",
        message: "Authorization header missing",
      };
    }
  } catch (err) {
    next(err);
  }
};

const authorization = (roles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.loggedUser) {
        throw { name: "Unauthorized", message: "User not authorized" };
      }

      if (roles.length === 0) {
        return next();
      }

      if (roles.includes(req.loggedUser.role)) {
        return next();
      }

      throw { name: "Unauthorized", message: "User Doesn't have permissions" };
    } catch (err) {
      next(err);
    }
  };
};

const isAdmin = authorization(['admin']);
const isTeacher = authorization(['admin', 'teacher']);
const isUser = authorization(['admin', 'teacher', 'user']);

module.exports = { 
  authentication, 
  authorization,
  isAdmin,
  isTeacher,
  isUser
};