const router = require('express').Router()
const Users = require('./usersModel')
const Plants = require('../plants/plantsModel')
const {restricted} = require('../auth/authMiddleware')
const bcryptjs = require('bcryptjs')
const {rounds} = require('../configs/secret')


router.get('/', restricted, async (req, res) => {
    const users = await Users.find()
    res.status(200).json(users)
})


router.get('/:id', restricted, async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Users.findById(id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', restricted, async (req, res, next) => {
    try {
        const userId = req.params.id
        let changes = req.body
        if(!changes.username || !changes.password || !changes.phone) {
            res.status(400).json({
                message: "please fill all required fields out"
            })
        } else {
            let newPassword = changes.password
            const hash = bcryptjs.hashSync(newPassword, rounds)
            changes = {
                ...changes,
                password: hash
            }
            const updatedUser = await Users.update(userId, changes)
            res.json(updatedUser)
        }
    } catch (err){
        next(err)
    }
})

router.get('/:id/plants', restricted, async (req, res, next) => { //eslint-disable-line
    const plants = await Plants.findById(req.params.id)
    res.status(200).json(plants)
  })

router.get('/:id/plants/:plant_id', restricted, async (req, res, next) => { //eslint-disable-line
    const plant = await Plants.findByPlantId(req.params.id, req.params.plant_id)
    res.status(200).json(plant)
  })
  
router.post('/:id/plants', restricted, async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await Users.findBy(userId)
        if (!user) {
            res.status(404).json({
                message: "user does not exist"
            })
        } else {
            const newPlant = await Plants.create(req.params.id, req.body)
            res.status(200).json(newPlant)
        }
  } catch (err) {
      next(err)
  }
})

router.delete('/:id/plants/:plant_id', restricted, async (req, res, next) => {
    const userId = req.params.id
    const userPlantId = req.params.plant_id
    try{
      const plantToDelete = await Plants.findByPlantId(userId, userPlantId)
      const idToDelete = plantToDelete[0].user_plants_id
      const deleted = await Plants.remove(idToDelete)
      res.json(deleted)
    }catch(err){
      next(err)
    }
  })

router.put('/:id/plants/:plant_id', restricted, async (req, res, next) => {
      try {
        const userId = req.params.id
        const userPlantId = req.params.plant_id
        const changes = req.body

        if(!changes.nickname || !changes.species) {
            res.status(400).json({
                message: 'please fill all required fields out'
            })
        } else {
            const updatedPlant = await Plants.updatePlant(userPlantId, changes, userId)
            res.json(updatedPlant)
        }
      } catch (err) {
          next(err)
      }
  })


module.exports = router