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

//login
router.post('/login',async(req,res)=>{
    try {
        const user = await userModule.findOne({email:req.body.email})
        !user&&res.status(400).json('email is not exist')

        ValidatPass = await bycrpt.compare(req.body.password , user.password)
        !ValidatPass&& res.status(200).json("Incorrect Password");

       // const {password, ...others} =user._doc
        res.status(200).json(user);

    } catch (err) {
    res.status(500).json(err)
   
        
    }
})

module.exports = router

