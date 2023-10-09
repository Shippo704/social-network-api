// import models
const { Thought, User } = require('../models');

// create a model for exports
const thoughtController = {

    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((thoughts) => {
                res.json(thoughts);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // GET a single thought by _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'Thought with this ID does not exist.' });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST/CREATE a new thought
    // push thought to associated user's thoughts
    createThought(req, res) {
        Thought.create(req.body)
            .then((ThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: ThoughtData._id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Thought has been created but no user with this id!' });
                }

                res.json({ message: 'Thought has been created!' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST/UPDATE thought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((updatedThought) => {
                if (!updatedThought) {
                    return res.status(404).json({ message: 'Thought with this ID does not exist.' });
                }
                res.json(updatedThought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE thought by _id
    // pull from user's thoughts
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((deletedThought) => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'Thought with this ID does not exist.' });
                }

                // pull thought from user's thoughts array
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then((updatedUser) => {
                if (!updatedUser) {
                    return res.status(404).json({ message: 'Thought has been deleted but no user with this id!' });
                }
                res.json({ message: 'Thought has been deleted!' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST/CREATE reaction to a thought
    // by updating a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((newReaction) => {
                if (!newReaction) {
                    return res.status(404).json({ message: 'User with this ID does not exist.' });
                }
                res.json(newReaction);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE reaction by reactionId
    // by updating a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'Thought with this ID does not exist.' });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

// export the module containing the controllers
module.exports = thoughtController;