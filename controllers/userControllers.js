// import models
const { User, Thought } = require('../models');

// create a module for export
const userController = {

    // GET all users
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // GET a single user by _id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User does not exist.' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST/CREATE new  user
    createUser(req, res) {
        User.create(req.body)
            .then((newUser) => {
                res.json(newUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // PUT/UPDATE user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {$set: req.body},
            {
                runValidators: true,
                new: true,
            }
        )
            .then((updatedUser) => {
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User does not exist.' });
                }
                res.json(updatedUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE user by _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((deletedUser) => {
                if (!deletedUser) {
                    return res.status(404).json({ message: 'User does not exist.' });
                }

                // get user id and delete their associate thoughts
                return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User and associated thoughts deleted.' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // PUT/ADD a friend
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User does not exist.' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE a friend
    // by PUT/UPDATE a user
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then((deletedFriend) => {
                if (!deletedFriend) {
                    return res.status(404).json({ message: 'User does not exist.' });
                }
                res.json(deletedFriend);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

// export the module containing the controllers
module.exports = userController;