const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({

    task_name:String,
    task_desc:String,
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"register",
        required:true
    },
    task_status:{
        type:String,
        required:true,
        enum:["pending","inprogress","completed"]
    },
    task_time:{
        type:Date,
        required:true,
        

    }
})

module.exports=mongoose.model("tasks",taskSchema)