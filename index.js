require('dotenv').config()

// creating expres
const express = require('express')
const cors = require('cors')
require('./mongoDB')
const routes = require('./routes')

const lostFoundServer = express()
lostFoundServer.use(cors())
lostFoundServer.use(express.json())
lostFoundServer.use(routes)
const PORT = 4000 || process.env.PORT

lostFoundServer.listen(PORT, ()=>{
    console.log(`Server connected successfully at port number: ${PORT}`);
})