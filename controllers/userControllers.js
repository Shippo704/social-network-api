// import models
const { User, Thought } = require('../models');

// create a module for export
const userController = {

    // GET all users
    getUsers(req, res) {
        // find all users
        User.find()
            .select('-__v')
            // return results
            .then((users) => {
                res.json(users);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // GET a single user by _id
    getSingleUser(req, res) {
        // find user by id
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            // populate the friends and thoughts arrays
            .populate('friends')
            .populate('thoughts')
            // return results
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with this ID' });
                }
                res.json(user);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST/CREATE new  user
    createUser(req, res) {
        // create new user with attributes in req body
        User.create(req.body)
            // return result
            .then((newUser) => {
                res.json(newUser);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // PUT/UPDATE user by _id
    updateUser(req, res) {
        // find user by id
        User.findOneAndUpdate(
            { _id: req.params.userId },
            // set new attribute values according to req body
            {$set: req.body},
            {
                runValidators: true,
                new: true,
            }
        )
            // return result
            .then((updatedUser) => {
                if (!updatedUser) {
                    return res.status(404).json({ message: 'No user with this ID' });
                }
                res.json(updatedUser);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE user by _id
    deleteUser(req, res) {
        // find and delete user
        User.findOneAndDelete({ _id: req.params.userId })
            .then((deletedUser) => {
                if (!deletedUser) {
                    return res.status(404).json({ message: 'No user with this ID' });
                }

                // get user id and delete their associate thoughts
                return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            })
            // return result
            .then(() => {
                res.json({ message: 'User and associated thoughts deleted successfully' });
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // PUT/ADD a friend
    addFriend(req, res) {
        // find user by id
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            // add friend's userId to friends array of user
            { $addToSet: { friends: req.params.friendId } }, 
            { new: true })
            // return results
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with this ID' });
                }
                res.json(user);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE a friend
    // by PUT/UPDATE a user
    deleteFriend(req, res) {
        // find user by id
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            // pull friends userId out of user's friends array
            { $pull: { friends: req.params.friendId } }, 
            { new: true })
            // return result
            .then((deletedFriend) => {
                if (!deletedFriend) {
                    return res.status(404).json({ message: 'User does not exist.' });
                }
                res.json(deletedFriend);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

// export the module containing the controllers
module.exports = userController;