const express = require('express')
const {middleware} = require('../middleware/auth.js');

const router = new express.Router()

const { getHomeData } = require("../controllers/home.js");

router.post('/home', middleware, getHomeData)

module.exports = router