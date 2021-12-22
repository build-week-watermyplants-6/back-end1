const { jwtSecret } = require("../configs/secret")
const jwt = require('jsonwebtoken')
const { findBy } = require("../users/usersModel")

const restricted = (req, res, next) => {
  const token = req.headers.authorization

  if(!token){
    res.status(401).json({message: 'token required'})
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if(err) {
        res.status(401).json({message: 'token invalid'})
      } else {
        req.decodedJwt = decoded
        next()
      }
    })
  }
}


const checkUsernameExists = async (req, res, next) => {
  try{
    const userNameToCheck = req.body.username
    const userFound = await findBy(userNameToCheck)

    if(userFound.length === 0){
      res.status(401).json({message:'invalid credentials'})
    }else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

const checkUsernameFree = async (req, res, next) => {
  try{
    const userNameToCheck = req.body.username
    const userFound = await findBy(userNameToCheck)

    if(userFound.length === 0){
      next()
    }else {
      res.status(401).json({message:'Username taken'})
    }
  } catch(err) {
    next(err)
  }
}

function checkBodyExists(req, res, next) {
  const body = req.body
  if(!body || !body.username || !body.password) {
    res.status(422).json({message: "username and password required"})
  } else {
    next()
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
  checkUsernameFree,
  checkBodyExists
}