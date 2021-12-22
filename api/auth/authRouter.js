const router = require('express').Router()
const Users = require('../users/usersModel')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const {jwtSecret, rounds} = require('../configs/secret')
const {checkUsernameExists, checkBodyExists, checkUsernameFree} = require('./authMiddleware')


router.post('/register', checkBodyExists, checkUsernameFree, async (req, res, next) => { //eslint-disable-line
  const credentials = req.body
  const hash = bcryptjs.hashSync(credentials.password, rounds)
  credentials.password = hash

  Users.add(credentials)
  .then(user => {
      console.log(user)
      res.status(201).json(user)
  })
  .catch(error => {
      res.status(500).json({
          message: error.message
      })
  })
})

router.post('/login', checkBodyExists, checkUsernameExists, async (req, res, next) => {
  try {
    let {username, password} = req.body
    const user = await Users.findBy(username).first()
    console.log(user)
        if (user && bcryptjs.compareSync(password, user.password)) {
            const token = buildToken(user)
            res.status(200).json({
                user_id: user.user_id,
                message: `Welcome ${user.username}`,
                token
            })
        } else {
            res.status(401).json({
                message: 'invalid credentials'
            })
        }
  } catch (err) {
      next(err)
  }
})

function buildToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const config = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, jwtSecret, config)
}

module.exports = router
