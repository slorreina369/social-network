const { User } = require('../models');

const userController = {
    getAllUsers(req,res){
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    getUserById({params},res){
        User.findOne({_id:params.id})
        .then(dbUserData =>{
            if(!dbUserData){
                res.json(404).json({message:'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createUser({body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    updateUser({params, body}, res){
        User.findOneAndUpdate(
        {
            _id:params.id
        },
        body,
        {new:true})
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message:'No User found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteUser({params}, res){
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message:'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({params, body}, res){
        Promise.all([
            User.findById(
                {_id:params.id}
            ),
            User.findById(
                {_id:body.friendId}
            )
        ])
        .then(dbUsersData =>{
            if(!dbUsersData.every(user=>user)){
                res.status(404).json({message:'No User found with this id'});
                return;
            }
            return Promise.all([
                User.findByIdAndUpdate(
                    {_id:params.id},
                    {$push:{friends:body.friendId}},
                    {new:true}
                ),
                User.findByIdAndUpdate(
                    {_id:body.friendId},
                    {$push:{friends:params.id}},
                    {new:true}
                )
            ])
        })
        .then(([firstUser]) =>{
            res.json(firstUser);
        })
        .catch(err => res.status(500).json(err));
    },
    removeFriend(){}
}

module.exports = userController;