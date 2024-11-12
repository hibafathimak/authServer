require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./database/dbConnection')
const router=require('./routes/router')


const authServer = express()

authServer.use(cors())
authServer.use(express.json())
authServer.use(router)


const PORT = 3000 || process.env.PORT

authServer.listen(PORT,()=>{
    console.log(`server started running at port : ${PORT}  and waiting for client request`);
    
})

authServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:blue">server started at port and waiting for client request !!!<h1/>`)
})  