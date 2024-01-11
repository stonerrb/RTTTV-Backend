const express = require('express')
const {middleware} = require('../middleware/auth.js');

const router = new express.Router()

const {authSignup, authLogin, authverify, authLogout} = require('../controllers/auth.js')

router.post('/signup', authSignup )

router.post('/login', authLogin )

router.post('/verify/:phone_number', authverify)

router.post('/logout', middleware, authLogout)

module.exports = router