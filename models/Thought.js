// import mongoose modules
const {Schema, model} = require('mongoose');

// import moment for timestamps
const moment = require('moment');

// require reactionSchema
const reactionSchema = require('./Reaction');

// thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (time) => moment(time).format('MMM/DD/YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});

// virtual property for reactionCount
thoughtSchema.virtual('reactionCount').get(() => {return this.reactions.length;});

// export model
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;