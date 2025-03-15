const express=require('express');
const app=express();

app.use(express.json())
const {authentication}=require("./middlewares/authenctication.js")

const dbConnect=require("./config/dbConnect");
dbConnect();


const cookies = require("cookie-parser");
app.use(cookies())

require("dotenv").config();



const {createTask, getTasks, updateTask, deleteTask}=require("./controllers/task")
const {createUser, loginUser, loggedOut}=require("./controllers/auth")
const{DeleteUser}=require("./controllers/userDelete")



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
app.delete("/deluser",authentication,DeleteUser);



app.listen(process.env.PORT,()=>{
    console.log("server running sucess :",process.env.PORT);
})

