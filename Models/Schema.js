const mongoose=require("mongoose")
const Mongoose_Schema=new mongoose.Schema(
    {
        client_secret:{
            type:String,
            required:true,
        },
        amount:{
            type:Number,
            required:true
        }
    }
)
module.exports=mongoose.model('User',Mongoose_Schema)