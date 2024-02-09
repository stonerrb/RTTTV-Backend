const express = require('express')

const router = new express.Router()

const {homepage , getMovie} = require('../controllers/homepage.js')

router.post('/home', homepage );

router.post('/getmovie/:id', getMovie);

module.exports = router