const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('./database/db')
const userRouter = require('./router/auth')
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())
Database();
app.use("/api/auth",userRouter)

port = 3000 ;
app.listen((port) , ()=>{
 console.log(`Server connected to http://localhost:${port}`)
})
