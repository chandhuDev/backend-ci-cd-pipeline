const mongoose=require("mongoose")
exports.Connect=async ()=>{
    await mongoose.connect(`mongodb+srv://chandhu:${process.env.MONGODB_SECRET}@cluster-chandhu.noac63n.mongodb.net/?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((result)=>{
        console.log('connection done successfully')
    }).catch((error)=>{
        console.log(error.message)
    })
}

