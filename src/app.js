require('./db/mongoose')

const express = require('express');
const cors = require('cors');

const authroute = require('./routes/auth.js')

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(authroute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

module.exports = {app};
