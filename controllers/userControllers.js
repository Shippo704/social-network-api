// import models
const {User, Thought} = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        }
        catch (error) {
            res.status(500).json(error)
        }
    },

    // GET a single user by _id
    async getSingleUser(req, res) {
        try {
            const user=await User.findOne({_id: req.params.userId}).select('-__v');

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
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // PUT/UPDATE user by _id
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                {
                    runValidators: true,
                    new: true
                }
            )
    
            if (!user) {
                res.status(404).json({message: 'No user with that ID'});
            }
    
            res.json(updatedUser);
        }
        catch (error) {
            res.status(500).json(error);
        }

    },

    // DELETE user by _id
    // and remove associated thoughts
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({_id: req.params.userId});

            if (!user) {
                res.status(404).json({message: 'No user with that ID'});
            }

            const deletedThoughts = await Thought.deleteMany({_id: {$in: deletedUser.thoughts}});

            res.json(deletedUser, deletedThoughts);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }






}

