// import mongoose modules
const { Schema, model } = require('mongoose');


//  define user schema
const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Must match an email address'
        ],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
);
  
// virtual friendCount that gets the number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
  
// create model from userSchema
const User = model('User', userSchema);
  
// export model
module.exports = User;