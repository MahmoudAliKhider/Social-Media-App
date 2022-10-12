const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

port = 3000 ;
app.listen((port) , ()=>{
 console.log(`Server connected to http://localhost:${port}`)
})
