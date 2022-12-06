require('dotenv').config()

const { BCRYPT_SALT_ROUNDS, EMAIL_API } = process.env

module.exports = {
  BCRYPT_SALT_ROUNDS,
  EMAIL_API
}
