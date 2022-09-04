const { Schema, model} = require ('mongoose');

const UserSchema = new Schema(
    //email, thoughts, friends
    {
     username:{
        //string, unique, required, trimmed
        type:String,
        unique:true,
        required:true,
        trim: true
     }   
    }
)