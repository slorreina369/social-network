const {User, Thought} = require('../models');

const thoughtController = {
    addThoughts({params, body}, res){
        console.log(params);
        Thought.create(body)
        .then(({_id}) =>{
            return User.findOneAndUpdate(
                {_id:body.userid},
                {$push:{thoughts:_id}},
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
    removeThought({params, body}, res){
        Thought.findOneAndDelete({_id:params.thoughtId})
        .then(deletedThought =>{
            if(!deletedThought){
                return res.status(404).json({message:'No thought found with this id'});
            }
            return User.findByIdAndUpdate(
                {_id:body.userid},
                {$pull:{thoughts:params.thoughtId}},
                {new:true}
            )
            .then(dbUserData => {
                if(!dbUserData){
                    console.log("there is no funny joke for user not found");
                    res.status(404).json({message:'No User found with this id!'});
                    return;
                }
                console.log('user found');
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err, 'well thats funny');
                res.status(501).json(err);
            })
        })

        .catch(err => {
            console.log('some string', err);
            res.status(500).json(err)
        })
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