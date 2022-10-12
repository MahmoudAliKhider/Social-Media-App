const mongoose = require('mongoose');

const connectedDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser:true,

        }).connection
        console.log("connected with database")
        
    } catch (err) {
        console.error(err)
    }
}
module.exports = connectedDB;