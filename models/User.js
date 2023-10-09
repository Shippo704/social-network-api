// import mongoose modules
const {Schema, model} = require('mongoose');

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        ]
    },
    // references to thoughts document
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    // references to friends document
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
    
});

// virtual property for friendcount
userSchema.virtual('friendCount').get(() => {return this.friends.length});

// export model
const User = model('User', userSchema);
module.exports = User;