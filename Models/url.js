const  mongoose  = require("mongoose");

const urlSchema=new mongoose.Schema({
shortId:{
    type:String,
    required:true,
    unique:true
},
redirectUrl:{
    type:String,
    required:true
},
visitHistory:[{
    timestamp:{
        type:Number
    }
}],
generatedBy:{
    type:mongoose.Schema.ObjectId,
    ref:"users"
}
},{timestamps:true});
const Url=mongoose.model("url",urlSchema);
module.exports=Url;
