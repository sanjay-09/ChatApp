const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    content:{
        type:String
    },
    userName:{
        type:String
    },
    roomId:{
        type:String
    }
})
const user=mongoose.model('user',userSchema);
module.exports=user;