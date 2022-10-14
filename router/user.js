const router = require('express').Router()
const Post = require('../models/Post');
const User = require('../models/User')
const bcrypt = require('bcrypt');

//update 
router.put('/update/:id',async(req,res)=>{
    //بقارن بين (userId=>الي موجود في body),id=>الي في)(url)
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = bcrypt.hash(req.body.password,salt)
            } catch (err) {
            res.status(400).json(err)
                
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            res.status(200).json("Account Has be updated")

            
        } catch (err) {
            res.status(400).json(err)
            
        }
    }else{
        res.status(400).json("you can`t update Account!")

    }
})

//delete
router.delete('/delete/:id',async(req,res)=>{
    //بقارن بين (userId=>الي موجود في body),id=>الي في)(url)
    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account Has been deleted")

            
        } catch (err) {
            res.status(400).json(err)
            
        }
    }else{
        res.status(400).json("you can`t delete Account!")

    }
})



module.exports = router;