// import models
const {User, Thought} = require('../models');

// export all controllers
module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        try {
            const thoughts = Thought.find();
            res.json(thoughts);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    // GET a single thought by _id
    getSingleThought(req, res) {
        try {
            const thought = Thought.findOne({_id: req.params.thoughtID});

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
    createThought(req, res) {
        try {
            const thoughtData = Thought.create(req.body);
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
    updateThought(req, res) {
        try {
            const updatedThought = Thought.findOneAndUpdate(
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
    deleteThought(req, res) {
        try {
            const deletedThought = Thought.findOneAndDelete({_id: req.params.thoughtId});

            if (!deletedThought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }

            const updatedUser = User.findOneAndUpdate(
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
    createReaction(req, res) {
        try {
            const newReaction = Thought.findOneAndUpdate(
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
    deleteReaction(req, res) {
        try {
            const thought = Thought.findOneAndUpdate(
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