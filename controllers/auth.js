const registerSchema=require("../models/registerSchema");
const bcrypt=require('bcrypt'); //bcryt for convert password into hash format
const jwt=require("jsonwebtoken") //token for check always authentication
require("dotenv").config();

exports.createUser=async(req,res)=>{

try{
    const {email,password}=req.body; //get email and id from body

    if(!email || !password){   //checking email and password present or not
        return res.status(400).json({
             sucess:false,
             message:"Please Enter all data",   
        })

    }

    const is_exist=await registerSchema.findOne({email}) //find user already present or mot for avoiding duplications

    if(is_exist){
      return res.status(404).json({
        sucess:false,
        message:"This user already present,Kindly Login"
      })
    }

    const hashedPassword= await bcrypt.hash(password,10); //convert a password into hash
    const response=await registerSchema.create({email,password:hashedPassword}); //store a hash password as a password 

    return res.status(200).json({
        sucess:true,
        message:"User registerd Sucessfully",
        data:response
    })
}
catch(err){
    console.log(err);;
}

}

exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;  
        if(!email || !password){  //for confirm email and password is not empty
            res.status(400).json({
                message:"Email and Password required"
            })
        }
        const exist_data=await registerSchema.findOne({email})  //find a email id's record for checking password
        
        
        if( await bcrypt.compare(password,exist_data.password)){ //compare method is use to check password 
               

            //if password is correct then we will create a jwt token for authentication

            const token= jwt.sign({


                email:email,
                _id:exist_data._id


            },process.env.JWT_SECRECT); //we pass email,and unique id  and our secret key 
            
            return res.cookie("token",token,{
                   expires:new Date((Date.now()+1000*600))   //set as cookie

            }).status(200).json({
                sucess:true,
                message:"You are Logged in sucessfully",  //sending a message to user
            
            })
        }
        else{
            return res.status(200).json({
                sucess:false,
                message:"No Match Found , Kindly registerd first", //if password does not match in compare method then we return this
            
            })
        }
        
    }
    catch(err){
console.log(err)
    }
}
exports.loggedOut=async(req,res)=>{
 try{
   return res.cookie("token",null,{
   expires:new Date((Date.now()))

   }).status(200).json({
        sucess:true,
        message:"User Logged Out Sucessfully"
    })
 }
 catch(err){
    console.log(err)
 }
}