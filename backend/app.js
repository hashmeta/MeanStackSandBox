const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')
const postroutes=require('./routes/posts')
mongoose.connect('mongodb+srv://admin:AdMin@cluster0-ezral.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept'
        )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS'
        )
    next()
})

app.use('/api/posts',postroutes)
module.exports = app;