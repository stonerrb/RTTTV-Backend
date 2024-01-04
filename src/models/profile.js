const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
    },
    movies_watched: [
        {
            movie:{
                type:Id
            }
        }
    ],
    movies_liked: [
        {
            movie:{
                type:Id
            }
        }
    ],
});

module.exports = mongoose.model('Profile', profileSchema);