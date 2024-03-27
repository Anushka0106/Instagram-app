const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose.Types

// Define the POST schema
const postSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'USER' // Assuming you have a User model
        }
    ],
    comments: [{
        comment: { type: String },
        postedBy: { type: ObjectId, ref: "USER" } // Use ObjectId here
    }],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'USER' // Assuming you have a User model
    },
    postedByName: String // Adding postedByName field to store the name of the user
}, { timestamps: true }); // Include timestamps for createdAt and updatedAt

// Create the POST model
const Post = mongoose.model('POST', postSchema);

module.exports = Post;
