const router = require('express').Router()


router.post('/register', (req, res) => {
  res.json({message: 'register endpoint here'})
})

router.post('/login', (req, res) => {
  res.json({message: 'login endpoint here'})
})

router.get('/logout', (req, res) => {
  res.json({message: 'logout endpoint here'})
})

module.exports = router

module.exports = router