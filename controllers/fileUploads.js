const cloudinary=require("cloudinary").v2;
const fileUploadFunc=require("../utils/fileupload");


exports.UploadFile=async(req,res)=>{

  try{
  const image=req.files.imageFile;
  // console.log(image);
  const foldername="Home/TaskPhoto"

  console.log("this is image taken from body",image)
  
  fileUploadFunc(image,foldername);

  
  return res.status(200).json({
    sucess:true,
    message:"File Save Sucessfully"
  })
  }

  catch(err){
    console.log(err);
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }

}
