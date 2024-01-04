const express = require('express');
const auth0controller = require('../controllers/auth0controller');

const auth0router = express.Router();

auth0router.post('/user/auth0/loginOrSignup', auth0controller.loginOrSignup);

module.exports = auth0router;

