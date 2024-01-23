const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"visitor"
    }

})

const UserModel=mongoose.model('user',UserSchema)
module.exports=UserModel