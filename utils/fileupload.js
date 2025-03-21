const cloudinary=require("cloudinary").v2
const fileUploadFunc=async(image,foldername)=>{
try{

console.log("Function execution start")
console.log("checking from function",image)

const folder=foldername;
const options={
    folder:folder,
    resource_type:"auto"
}

const response=await cloudinary.uploader.upload(image.tempFilePath,options)

// if(response){
//     console.log("Response is not present ",response)
// }

console.log(response);
}
catch(err){
 console.log(err);
}
}

module.exports=fileUploadFunc;