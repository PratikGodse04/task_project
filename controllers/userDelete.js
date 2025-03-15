const taskSchema=require("../models/tasks"); //task schema for doing operations on tasks model
const userSchema=require("../models/registerSchema"); //same


exports.DeleteUser= async(req,res)=>{
    console.log("Controller executres")

const user_id=req.payload._id


try{

const res1= await userSchema.findByIdAndDelete(user_id);
const res2= await taskSchema.deleteMany({user_id:{$eq:user_id}})

if(res1 && res2){
    return res.status(200).json({
        sucess:true,
        message:"User Account has deleted"
    })
}

}
catch(err){
    return res.status(404).json({
        sucess:false,
        message:"User not Found",

    })
    
}

}