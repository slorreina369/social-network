const {User, Thought} = require('../models');

const thoughtController = {
    addThoughts({params, body}, res){
        console.log(body);
        Thought.create(body)
        .then(({_id}) =>{
            return User.findOneAndUpdate(
                {_id:params.UserId},
                {$push:{comments:_id}},
                {new:true}
            );
        })
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message:'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$push:{reples:body}},
            {new:true, runValidators:true}
        )
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message:'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    removeThought({params}, res){
        Thought.findOneAndDelete({_id:params.thoughtId})
        .then(deletedThought =>{
            if(!deletedThought){
                return res.json(404).json({message:'No thought found with this id'});
            }
            return User.findByIdAndUpdate(
                {_id:params.UserId},
                {$pull:{thoughts:params.thoughtId}},
                {new:true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message:'No User found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    removeReaction({params}, res){
        Thought.findOneAndDelete(
            {_id:params.thoughtId},
            {$pull:{replies:{commentId:params.commentId}}},
            {new:true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;
//there are so many jokes here that can be made. please be happy I made none