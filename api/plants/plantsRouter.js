const router = require('express').Router()
const Plants = require('./plantsModel')
const {restricted} = require('../auth/authMiddleware')

router.get('/', restricted, async (req,res) => {
  const plants = await Plants.find()
  res.status(200).json(plants)
})


module.exports = router