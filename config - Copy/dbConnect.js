const mongoose=require('mongoose');

const dbConnect=()=>{
    mongoose.connect("mongodb://localhost:27017/chat") //database connectivity
    .then((data)=>{ 
        console.log("connection Esatblished sucessfully :",data.connection.host)
        
    }).catch((err)=>{
        console.log("occuring error while connecting database",err);
        
    })
}

module.exports=dbConnect; //export to index.js file
