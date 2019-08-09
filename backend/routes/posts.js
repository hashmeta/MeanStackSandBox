const express = require('express')
const multer=require('multer')
const Post=require('../models/post')
const router=express.Router()
const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        const isValid=MIME_TYPE_MAP[file.mimetype]
        let error=new Error('Invalid mine type')
        if(isValid){
            error=null
        }
        callback(error,"backend/images")
        
    },
    filename:(req,file,callback)=>{
        const name=file.originalname.toLowerCase().split(' ').join('-')
        const ext=MIME_TYPE_MAP[file.mimetype]
        callback(null,name+'-'+Date.now()+'.'+ext)
    }
})
router.post('',multer({storage:storage}).array("images[]",12),(req,res,next)=>{
    const post= new Post({
        title:req.body.title,
        content:req.body.content
    })
    post.save().then(createdPost=>
        res.status(200).json({
            message:'Post added sucessfully',
            postId:createdPost._id,

        })
    )
})
router.put('/:id',(req,res)=>{
    const post= new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content
    })
    Post.updateOne({_id:req.params.id},post).then(result=>{
        res.status(200).json({
            message:"Update Successfully",
        })
    })
})
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id).then(post=>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({
                message:"Post not found",
                })
            }
        })
})

router.get('',(req,res)=>{
    Post.find().then(documents=>{
        res.status(200).json({
        message:"Posts fetched Sucefully",
        posts:documents
        })
    })
})

router.delete('/:id',(req,res)=>{
    Post.deleteOne({
        _id:req.params.id
    }).then(result=>{
        res.status(200).json({
            message:'Post deleted'
        })
    })    
})

module.exports=router