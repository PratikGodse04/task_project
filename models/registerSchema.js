const mongoose=require("mongoose");

const registerSchema=new mongoose.Schema({
              
    email:{
        type:String,
        required:true
    }
    ,
    password:{
        type:String,
        required:true
    },
    tasks: [
        //  it wll be storing array 
        {
            //  mongodb object id datatype 
            type: mongoose.Schema.Types.ObjectId,
            //  which collection or table u are referencing too 
            ref: "tasks",


        }
    ]
})

module.exports=mongoose.model("register",registerSchema)