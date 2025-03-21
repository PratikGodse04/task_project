const taskSchema=require("../models/tasks"); //task schema for doing operations on tasks model
const userSchema=require("../models/registerSchema"); //same
const registerSchema = require("../models/registerSchema");


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

exports.adminUserDelete=async(req,res)=>{

    const id=req.payload._id;

    try{
        const response=await registerSchema.findById(id);

        if(response.position!=="admin"){
            return res.status(400).json({
                sucess:false,
                message:"You Do not have permission to delete other user"
            })
        }
         const id1=req.params.id
         console.log(id1)
        const res1=await registerSchema.findByIdAndDelete(id1);

        if(res1){
            return res.status(200).json({
                sucess:true,
                message:"User Delete Sucessfully"
            })
        }
        
    }
catch(error){
    return res.status(500).json({
        sucess:false,
        message:"Internal Server Error Occured While Deleting user"
    })
}

}