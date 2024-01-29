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
    ratings: [
        {
            rating: {
                type: Number,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    reviews: [
        {
            review: {
                type: String,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    duration: {
        type: Number,
        required: true,
    },
    languages: [
        {
            language: {
                type: String,
            }
        }
    ],
    genres: [
        {
            genre: {
                type: String,
            }
        }
    ],
    description: {
        type: String,
        required: true,
    },
    video_title: {
        type: String,
    },
    poster_title: {
        type: String,
    },
});

module.exports = mongoose.model('Movie', movieSchema);