// import models
const {User, Thought} = require('../models');

// export all controllers
module.exports = {
    // GET all users
    getUsers(req, res) {
        try {
            const users = User.find();
            res.json(users);
        }
        catch (error) {
            res.status(500).json(error)
        }
    },

    // GET a single user by _id
    getSingleUser(req, res) {
        try {
            const user= User.findOne({_id: req.params.userId}).select('-__v');

            if (!user) {
                return res.status(404).json({message: 'No user with that ID'});
            }

            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    // POST/CREATE new user
    createUser(req, res) {
        try {
            const userData = User.create(req.body);
            res.status(200).json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // PUT/UPDATE user by _id
    updateUser(req, res) {
        try {
            const updatedUser = User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                {
                    runValidators: true,
                    new: true
                }
            )
    
            if (!updatedUser) {
                 return res.status(404).json({message: 'No user with that ID'});
            }
    
            res.json(updatedUser);
        }
        catch (error) {
            res.status(500).json(error);
        }

    },

    // DELETE user by _id
    // and remove associated thoughts
    deleteUser(req, res) {
        try {
            const deletedUser = User.findOneAndDelete({_id: req.params.userId});

            if (!deletedUser) {
                return res.status(404).json({message: 'No user with that ID'});
            }

            const deletedThoughts = Thought.deleteMany({_id: {$in: deletedUser.thoughts}});

            res.json(deletedUser, deletedThoughts);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    // PUT/ADD friend
    addFriend(req, res) {
        try {
            const user = User.findOneAndUpdate(
                {_id: req.params.id},
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
                );
    
            if (!user) {
                return res.status(404).json({message: 'Ne user with that ID'});
            }
    
            res.json(user);
        }
        catch {error} {
            res.status(500).json(error);
        }
    },

    // DELETE friend
    // by PUT/UPDATE a user
    deleteFriend(req, res) {
        try {
            deletedFriend = User.findOneAndUpdate(
                {_id: req.params.id},
                {$pull: {friends: req.params.friendId}},
                {new: true}
            );

            if (!deletedFriend) {
                return res.status(404).json({message: 'No user with that ID'});
            }

            res.json(deletedFriend);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
};

