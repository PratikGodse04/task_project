
const registerSchema=require("../models/registerSchema")

exports.isAdmin=async(req,res,next)=>{
    try{

        const id =req.payload._id
        
     const response=await registerSchema.findById(id);
    
            if(response.position!=="admin"){
                return res.status(400).json({
                    sucess:false,
                    message:"You Do not have permission to delete other user"
                })
            }
            next();
    }
    catch(err){
       console.log("Internal Error in authorization ")
    }
}