// import mongoose modules
const {Schema, model, Types} = require('mongoose');

// import moment for timestamps
const moment = require('moment');

// reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (time) => moment(time).format('MMM/DD/YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

// export schema
module.exports = reactionSchema;