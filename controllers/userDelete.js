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
       
    const id=req.params.id
    console.log(id)
    try{
       
      console.log("Execution Start");

      const res3=await userSchema.findById(id);

      if(!res3 || null){
          return res.status(404).json({
              sucess:false,
              message:"User no present In database For this id"
          })
      }
     
       
        const res1=await userSchema.findByIdAndDelete(id);
        console.log(res1)
        const res2=await taskSchema.deleteMany({user_id:{$eq:id}})
        console.log(res2)

        if( res1 && res2){
            return res.status(200).json({
                sucess:true,
                message:"User Delete Sucessfully"
            })
        }
        else{
            return res.status(400).json({
                message:"Internal Error occured while deleting user "
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