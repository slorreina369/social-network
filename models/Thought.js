const { Schema, model} = require('mongoose');

const ThoughtSchema = new Schema (
    //  username, reactions
    {
        thoughtText:{
            type:String,
            required:true,
            min:1,
            max:280
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get:createdAtVal => dateFormat(createdAtVal)
        },
        username:{
            type:String,
            required:true
        }
        /*
         reaction:[ReactionSchema]
         */
    }
    /**
     * toJSON:{
     *      probably:?
     * }
     */
)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;