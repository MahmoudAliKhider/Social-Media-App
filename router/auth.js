const userModule = require('../models/User')
const router = require('express').Router();
const bycrpt = require('bcrypt');

//register
router.post('/register',async(req,res)=>{
   try {
    const salt = await bycrpt.genSalt(10);
    const hashPassword = await bycrpt.hash(req.body.password,salt)

    //create new user
    const model = new userModule({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword
    })
    const user = await model.save();
    res.status(200).json(user)
    
   } catch (err) {
    res.status(500).json(err)
   }

})

module.exports = router

