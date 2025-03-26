const express=require('express');
const app=express();

app.use(express.json())


const dbConnect=require("./config/dbConnect");
dbConnect();

const cloudConnect=require("./config/cloudinaryConnect.js");
cloudConnect();

//middleware for cookie
const cookies = require("cookie-parser");
app.use(cookies())

require("dotenv").config();
const cloudinary=require("cloudinary").v2;
const {authentication,}=require("./middlewares/authenctication.js")
const {isAdmin}=require("./middlewares/authorization.js")

const {createTask, getTasks, updateTask, deleteTask}=require("./controllers/task")
const {createUser, loginUser, loggedOut}=require("./controllers/auth")
const{DeleteUser,adminUserDelete}=require("./controllers/userDelete")
//cloudinary route
const{UploadFile}=require("./controllers/fileUploads.js")

//cloudinary connection

const fileupload=require("express-fileupload");

app.use(fileupload({
    tempFileDir:"/temp",
    useTempFiles:true
})

)

//routes start here 

//cloudinary route
app.post("/file",UploadFile);
//auth Routes
// const {authRoutes}=require("./routes/authRoutes.js");
// app.use("/chatapp/task",authRoutes);
app.post("/register",createUser);
app.post("/login",loginUser);  
app.get("/logged_out",authentication,loggedOut)




//
app.post("/task",authentication,createTask);
app.get("/",authentication,getTasks)
app.put("/task/:id" ,authentication,updateTask)
app.delete("/task/:id",authentication,deleteTask)

//User Deltetion
app.delete("/deluser",authentication,DeleteUser);
app.delete("/delbyadmin/:id",authentication,isAdmin,adminUserDelete)



// routers end here 



app.listen(process.env.PORT,()=>{
    console.log("server running sucess :",process.env.PORT);
})

