const express = require('express');
const cors = require('cors');
require('./db/mongoose')

const authenticationRoutes = require('./routes/authentication')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authenticationRoutes);
app.use(cors());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

module.exports = app;
