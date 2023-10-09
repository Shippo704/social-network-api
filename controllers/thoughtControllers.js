// import models
const {User, Thought} = require('../models');

// export all controllers
module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = Thought.find();
            res.json(thoughts);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    // GET a single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtID});

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    // POST/CREATE a new thought
    // push thought to associated user's thoughts
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            User.findOneAndUpdate(
                {_id: req.params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );

            res.json(thoughtData);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    // PUT/UPDATE a thought by _id
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {
                    runValidators: true,
                    new: true
                }
            );

            if (!updatedThought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }

            res.json(updatedThought);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    // DELETE thought by _id


    // POST/CREATE reaction to a thought


    // DELETE a reaction by reactionId



}