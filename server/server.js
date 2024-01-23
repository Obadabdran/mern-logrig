const express=require('express')
const app=express()
const mongoose=require('mongoose')
const  bcrypt=require('bcrypt')
const UserModel = require('./models/User')
const  cors = require('cors')
const jwt=require('jsonwebtoken')


app.use(express.json())
app.use(cors())

const username=process.env.USERNAME,
      password=process.env.PASSWORD,
      database=process.env.DATABASE

      
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.sokqpkg.mongodb.net/${database}?retryWrites=true&w=majority`)


app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    
   const user= await UserModel.findOne({username})
    user &&  res.json({message:"user is exist"})
    
    if(!user){
   const hashedpassword=bcrypt.hashSync(password,10)  
   const newuser=new UserModel({
    username,email,password:hashedpassword
   })
    await newuser.save()
   //await UserModel.create({username,email,password:hashedpassword})
     res.json({message:"user is added",newuser})
   
}    
})

app.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user=await UserModel.findOne({username})
    !user&&res.json({message:"user doesn't exist"})
    
     if(user){
     const ispass=bcrypt.compare(password,user.password)
     !ispass&&res.json({message:'username or password is not correct'})
     const token=jwt.sign({id:user._id},'shshsh')
    res.json({status:"success",token,id:user._id,role:user.role})
     
     }
      
 })

app.listen(5000,(req,res)=>{
    console.log("server is working")
})


