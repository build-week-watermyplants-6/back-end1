const router = require('express').Router()


router.get('/', (req, res) => {
  res.json({message: 'get all plants here'})
})

router.post('/', (req, res) => {
  res.json({message: 'post a new plant here'})
})

router.get('/:id', (req, res) => {
  res.json({message: 'get a specific plant here'})
})

router.put('/:id', (req, res) => {
  res.json({message: 'edit a specific plant here'})
})

router.delete('/:id', (req, res) => {
  res.json({message: 'delete a specific plant here'})
})

module.exports = router