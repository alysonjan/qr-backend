const bcrypt = require('bcryptjs')
const { BCRYPT_SALT_ROUNDS } = require('../configs/security')

const encryptPassword = async (rawPassword) => {
  const encryptedPassword = await bcrypt.hash(
    rawPassword,
    Number(BCRYPT_SALT_ROUNDS)
  )
  return encryptedPassword
}

const decryptPassword = async (rawPassword, dbPassword) => {
  const decryptedPassword = await bcrypt.compare(rawPassword, dbPassword)
  return decryptedPassword
}

module.exports = { encryptPassword, decryptPassword }
