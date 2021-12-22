const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
// const db = require('./data/db-config')

const authRouter = require('./auth/authRouter')
const usersRouter = require('./users/usersRouter')
const plantsRouter = require('./plants/plantsRouter')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)
server.use('/api/plants', plantsRouter)

server.get('/', (req, res) => {
  res.send('<h1>welcome to Water my Plants!</h1>')
})

module.exports = server
