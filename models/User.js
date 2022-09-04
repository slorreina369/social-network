const { Schema, model} = require ('mongoose');
const isEmail = require('validator');

const UserSchema = new Schema(
    //thoughts, friends
    {
     username:{
        type:String,
        unique:true,
        required:true,
        trim: true
     },
     email:{
        type:String,
        unique:true,
        required:true,
        validate: [isEmail, 'invalid email']
     },
    thoughts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Thought'
        }
     ],
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ]
    },
    {    
        toJSON:{
            virtuals:true,
            getters:true
        },
        id:false
    }
)

//create a virtual friendCount that retrieves the length of the user's friends

const User = model('User', UserSchema);

module.exports = User;