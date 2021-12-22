const rounds = process.env.BCRYPT_ROUNDS || 8;

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'shh',
  rounds
}