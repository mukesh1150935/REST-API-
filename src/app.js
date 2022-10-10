const { response } = require('express');
const express=require('express')
const app=express();


const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const port=process.env.PORT||8000;

require("./db/conn");
const studentModel=require('./models/students')

//in order to access json file
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("this  is from my side mykesh")
})

//this is getting the data from API using get method
app.get("/students",async(req,res)=>{
    try{
        const studentData=await studentModel.find();
        res.send(studentData);
    }catch(e){
        res.send(e);
    }
}) 

//this is for getting data of individual student
app.get("/students/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        //console.log(req.params);
       const studentData=await studentModel.findById(_id);
       console.log(studentData)
       
       if(!studentData){
        res.status(404).send();
       }
       else
       {res.send(studentData);
}
        
    }catch(e){
        res.status(500).send("no data of this id")
    }
})

// I am trying to get data by phone number as it is unique
// app.get("/students/:phno",async(req,res)=>{
//     try{
//         const _phno=req.params.phone;
//         console.log(req.params);
//        const Data=await studentModel.findOne(_phno);
//        res.send(Data);
        
//     }catch(e){
//         res.send("no data of this Phone")
//     }
// })

//



//this is post method for creattinng data elements for studnets=
//to create a new entry for student using post method
app.post("/students",(req,res)=>{
    console.log(req.body)
    // req.body.phone = req.file.path
    const user=new studentModel(req.body)

    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((error=>{
        res.status(400).send(error)
    }))
    
    //res.send("hello from app ")
})


//this is for delete dataentries
app.delete("/students/:id",async(req,res)=>{
    try{
                 const _id=req.params.id;
                //console.log(req.params);
               const deleteData=await studentModel.findByIdAndDelete(_id);
               console.log(deleteData)
               res.status(200).send("deleted successfully")
    }catch(e){
        res.status(404).send(e);
    }
})


//update data 
app.patch("/students/:id",async(req,res)=>{
try{
    const _id=req.params.id;
const updateStudent=await studentModel.findByIdAndUpdate(_id,req.body,{
    new:true
})
res.status(200).send(updateStudent)
}catch(e){
    res.staus(404).send(e);
}
})

///this is updation by put request
app.put("/students/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
    const updateStudent=await studentModel.findByIdAndUpdate(_id,req.body,{
        new:true
    })
    res.status(200).send(updateStudent)
    }catch(e){
        res.staus(404).send(e);
    }
    })

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`)
})

//633ee88a29263edc11e718d4

//All  requests like get ,get (for unique id),post,delete,patch working confirmed tested
//@mukeshsingh