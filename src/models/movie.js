const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true,
    },
    release_year: {
        type: Number,
        required: true,
    },
    cast: [
        {
            name:{
                type:String
            }
        }
    ],
    video_title: {
        type: String,
        required: true,
    },
    video_format: {
        type: String,
        required: true,
    },
    poster_title: {
        type: String,
        required: true,
    },
    poster_format: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Movie', movieSchema);