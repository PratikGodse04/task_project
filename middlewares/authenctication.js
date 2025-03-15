const jwt=require("jsonwebtoken"); // we import json web token for verify a token here 
require("dotenv").config();

exports.authentication=async(req,res,next)=>{

try{


 const token=req.cookies.token;
// console.log("The Token is :",token);

if(!token){
    res.status(404).json({
        sucess:false,
        message:"Please Kindly Login"
    })
}

const payload=jwt.verify(token,process.env.JWT_SECRECT);
// console.log(payload)

if(!payload){
    res.status(404).json({
        sucess:false,
        message:"Token is Invalid Kindly Login again"
    })
}
req.payload=payload;

next();
}
catch(err){
    console.log(err);
}

}