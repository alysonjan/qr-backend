require('dotenv').config()

const { BCRYPT_SALT_ROUNDS } = process.env

module.exports = {
  BCRYPT_SALT_ROUNDS,
}
