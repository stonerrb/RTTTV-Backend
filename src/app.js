require('./db/mongoose')
require('dotenv').config()
const bodyParser = require('body-parser');

const express = require('express');
const cors = require('cors');

const authroute = require('./routes/auth.js')
const adminroute = require('./routes/admin.js')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(authroute);
app.use(adminroute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

module.exports = {app};
