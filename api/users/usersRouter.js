const router = require('express').Router()


router.get('/', (req, res) => {
  res.json({message: 'get all users here'})
})

router.post('/', (req, res) => {
  res.json({message: 'post a new user here'})
})

router.get('/:id', (req, res) => {
  res.json({message: 'get a specific user by id here'})
})

router.put('/:id', (req, res) => {
  res.json({message: 'edit a specific user by id here'})
})

module.exports = router