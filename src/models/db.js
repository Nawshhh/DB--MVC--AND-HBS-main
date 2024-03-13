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