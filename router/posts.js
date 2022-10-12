const router = require('express').Router()
const Post = require('../models/Post');
const User = require('../models/User')

router.post('/',async(req,res)=>{
    const model = new Post(req.body);
    try {
        const savePost = await model.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:id',async(req,res)=>{
try {
    const post = await Post.findById(req.params.id)
    if(post.userId === req.body.userId){
      await post.updateOne({$set:req.body})
      res.status(200).json({message:"your post has been updated",
                            'data':post})
    }else{
      res.status(400).json("your post not  be updated")

    }
    
} catch (err) {
        res.status(400).json(err)
    
}})

module.exports=router