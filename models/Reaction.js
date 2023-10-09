// import packages
const { Schema, Types } = require('mongoose');
// use moment for timestamps
const moment = require('moment');

//  define reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => moment(time).format('MMM/DD/YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// export schema
module.exports = reactionSchema;