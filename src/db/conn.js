const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/students-api').then(()=>{
    console.log("connection build successfully")
}).catch((error)=>{
    console.log("no connection")
})


