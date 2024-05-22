const express = require('express');
const route = express.Router();
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');
const RegisterController = require('./src/controllers/RegisterController');

// Rotas da Home
route.get('/', HomeController.index);

// Rotas de Login
route.get('/login/index', LoginController.index)
route.post('/login', LoginController.index)

// Rotas de Registro
route.get('/register/index', RegisterController.index)
route.post('/register', RegisterController.register)

module.exports = route;