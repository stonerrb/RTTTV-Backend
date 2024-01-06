const express = require('express')

const router = new express.Router()

const {authSignup, authLogin, authverify} = require('../controllers/auth.js')

router.post('/signup', authSignup )

router.post('/login', authLogin )

router.post('/verify/:phone_number', authverify )

module.exports = router