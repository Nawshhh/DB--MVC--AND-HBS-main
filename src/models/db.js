const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type: String, required: true},
    password: { type: String, required: true },
    avatar_img: { type: String, default: "./images/profile-pic.png" },
});

const user = mongoose.model('users', userSchema);

module.exports = user;

const feedbackSchema = new mongoose.Schema({
    username: {type: String, required: true},
    feedback: {type: String, required: true},
    rating: {type: Number, default: 0},
    restaurant: {type: String, required: true}
});

const feedbacks = mongoose.model('feedback', feedbackSchema);

module.exports = feedbacks;

const restoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true  },
    food_rating: { type: Number, default: 5 },
    service_rating: { type: Number, default: 5  },
    ambiance_rating: { type: Number, default: 5  },
    date: { type: String, default: 0 },
    comment_img: { type: String, default: 0 },
    numLike: { type: Number, default: 0 },
    numDislike: { type: Number, default: 0 },
    ownerReplyStatus: {type: Number, default: 0}
});

const Comment = mongoose.model('comments', restoSchema);

module.exports = Comment;