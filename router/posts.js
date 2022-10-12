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

//get All post
router.get('/',async(req,res)=>{
    const post = await Post.find()
    try {
      res.status(200).json(post)

        
    } catch (err) {
        res.status(400).json(err)
        
    }
})
//Delete Post
router.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
try {
    const remove = await Post.remove({_id:id})
    res.status(200).json({message:"your post has been Deleted"})
    
} catch (err) {
    res.status(400).json(err)
    
}
})

module.exports=router