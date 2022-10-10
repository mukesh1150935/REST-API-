//here we create schema
const mongoose=require("mongoose")
const validator=require("validator")

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        unique:[true,"email id already exists"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(' invalid email')
            }
        }
    },
    
    phone:{
        type:Number
        // required:true,
        // unique:[true,"phone number already exists"],
        // minlength:10,
        // maxlength:10
    },
    address:String,

});

const studentModel= mongoose.model('Student', studentSchema);

module.exports=studentModel;