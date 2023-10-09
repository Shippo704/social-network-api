// import models
const { Thought, User } = require('../models');

// create a model for exports
const thoughtController = {

    // GET all thoughts
    getThoughts(req, res) {
        // find all thoughts
        Thought.find()
            // return result
            .then((thoughts) => {
                res.json(thoughts);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // GET a single thought by _id
    getSingleThought(req, res) {
        // find thought by id
        Thought.findOne({ _id: req.params.thoughtId })
            // return result
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with this ID' });
                }
                res.json(thought);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST/CREATE a new thought
    // push thought to associated user's thoughts
    createThought(req, res) {
        // create new thought
        Thought.create(req.body)
            .then((thoughtData) => {
                // find the user and update thoughts array
                return User.findOneAndUpdate(
                    // find by id
                    { _id: req.body.userId },
                    // push new thought into thoughts array
                    { $addToSet: { thoughts: thoughtData._id } },
                    { new: true }
                );
            })
            // return result
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user with this ID' });
                }

                res.json({ message: 'Thought created successfully' });
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST/UPDATE thought by _id
    updateThought(req, res) {
        // find thought by id
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // update the params in the req body 
            { $set: req.body }, 
            { runValidators: true, new: true })
            // return result
            .then((updatedThought) => {
                if (!updatedThought) {
                    return res.status(404).json({ message: 'No thought with this ID' });
                }
                res.json(updatedThought);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE thought by _id
    // pull from user's thoughts
    deleteThought(req, res) {
        // find and delete the thought by id
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((deletedThought) => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this ID' });
                }

                // pull thought from user's thoughts array
                return User.findOneAndUpdate(
                    // update the thoughts array from the user
                    { thoughts: req.params.thoughtId },
                    // pull thought out of thoughts array
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            // return result
            .then((updatedUser) => {
                if (!updatedUser) {
                    return res.status(404).json({ message: 'No user with this ID' });
                }
                res.json({ message: 'Thought deleted' });
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST/CREATE reaction to a thought
    // by updating a thought
    createReaction(req, res) {
        // update the thought
        Thought.findOneAndUpdate(
            // find by id
            { _id: req.params.thoughtId },
            // add new reaction to the reactions array
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            // return result
            .then((newReaction) => {
                if (!newReaction) {
                    return res.status(404).json({ message: 'No user with this ID' });
                }
                res.json(newReaction);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE reaction by reactionId
    // by updating a thought
    deleteReaction(req, res) {
        // update the thought
        Thought.findOneAndUpdate(
            // find by id
            { _id: req.params.thoughtId },
            // pull reaction out of reactions array
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            // return result
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with this ID' });
                }
                res.json(thought);
            })
            // catch errors
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

// export the module containing the controllers
module.exports = thoughtController;