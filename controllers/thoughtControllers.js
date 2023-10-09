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
    // pull from user's thoughts
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if (!deletedThought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }

            const updatedUser = await User.findOneAndUpdate(
                {thought: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            );

            res.json(deletedThought, updatedUser);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    // POST/CREATE reaction to a thought
    // by updating a thought
    async createReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {
                    runValidators: true,
                    new: true
                }
            );

            if (!newReaction) {
                return res.status(404).json({message: 'No thought with that ID'});
            }

            res.json(newReaction);
        }
        catch (error) {
            res.status(500).json(error);
        }

    },

    // DELETE a reaction by reactionId
    // by updating a thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {
                    runValidators: true,
                    new: true
                }
            );

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }

            res.json(thought);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
};