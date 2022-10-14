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

//get a post by id 
router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        const post = await Post.findById({_id:id})
        res.status(200).json(post)
        
    } catch (err) {
        res.status(400).json(err)
        
    }
})

//like/dislike a post
router.put('/:id/like',async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        //لو userId  موجود===>Like:disLike
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
        res.status(200).json("the post has been liked")

        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("the post has been disliked")
        }
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
        
    }
})

//get timeline posts

router.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports=router