// import packages
const { Schema, model } = require('mongoose');
// use moment for timestamps
const moment = require('moment');

// import reaction schema
const reactionSchema = require('./Reaction');

//  define thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'A thought is required',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => moment(time).format('MMM/DD/YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// virtual reactionCount that gets the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create model from userSchema
const Thought = model('Thought', thoughtSchema);

// export model
module.exports = Thought;

