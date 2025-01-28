const bcrypt = require("bcrypt");
const saltRounds = +process.env.SALT_ROUNDS;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

const validPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = { hashPassword, validPassword };