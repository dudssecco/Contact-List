const express = require('express');
const route = express.Router();
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');
const RegisterController = require('./src/controllers/RegisterController')

// Rotas da Home
route.get('/', HomeController.index);

// Rotas de Login
route.get('/login/index', LoginController.index)

// Rotas de Register
route.get('/register/index', RegisterController.index)

module.exports = route;