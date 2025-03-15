const taskSchema=require("../models/tasks"); //task schema for doing operations on tasks model
const userSchema=require("../models/registerSchema"); //same as taskSchema


exports.createTask=async(req,res)=>{
    
    const id=req.payload._id
    const task_name=req.body.task_name;
    const task_desc=req.body.task_desc;
    const task_status=req.body.task_status;
   const task_date1=new Date();

    const task_date=`${task_date1.getDate()}:${task_date1.getMonth()}:${task_date1.getFullYear()}`;
    console.log(task_date);
    

    if(!task_name || !task_desc || !task_status){
       return res.status(400).json({
            message:"Kindly Provide all Details"
        })
    }

    const response=await taskSchema.create({
        task_name:task_name,task_desc:task_desc,
        task_status:task_status,task_time:task_date,user_id:id
    });

    const user_id=req.payload._id;
    
    const user=await  userSchema.findByIdAndUpdate(user_id,{$push :{tasks:response._id}},{new:true});

    return res.status(200).json(
        {
            sucess:true,
            message:"task is created",
            data:response
        }
    )

}

exports.getTasks=async(req,res)=>{
    const id=req.payload._id
    
    //get task 
    // const response= await userSchema.find({});

    const response1=await userSchema.findById({_id:id}).populate("tasks");
    

    return res.send({
        sucess:true,
        message:"All tasks Fetch",
        response:response1

    })
}

exports.updateTask=async(req,res)=>{
    const id=req.params
    const user_id=req.payload._id;
    const task_name=req.body.task_name;
    const task_desc=req.body.task_desc;
    const task_status=req.body.task_status;

    try{

        const response=await taskSchema.findByIdAndUpdate(id.id,{task_name,task_desc,task_status,user_id},{new:true});
        return res.send({
            sucess:true,
            message:"task update sucessfully",
            response:response
    
        })
        
        
        
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteTask=async(req,res)=>{
   

    try{

        const task_id=req.params.id
       
        const response= await taskSchema.findByIdAndDelete(task_id);   
        const res1=await userSchema.findByIdAndUpdate(task_id,{$pull:{task_id}},{new:true})
        

       

        return res.status(200).json({
            sucess:true,
            message:"Task Delete Sucessfully",
            data:response
        })

    }
    catch(err){
        return res.status(404).json({
            message:"Not Acessible now ",
            err:err
        })
    }
}