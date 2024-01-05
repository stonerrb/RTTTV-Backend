require('dotenv').config()

const User = require('./models/user');

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/get-users', (req, res) => {
    try{
        
    }
    catch(e){

    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

module.exports = app;
