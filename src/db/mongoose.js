const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
    "mongodb+srv://takshalm:takshal0223@cluster0.tquaujb.mongodb.net/rttv",
)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to database'));

module.exports = mongoose;