/************************************************************************************
 * @purpose   : Used to provide user routes to web pages.
 * 
 * @file      : user.routes.js
 * @overview  : provides routes to web pages.
 * @author    : Kaushikiarasavilli@gmail.com
 * @version   : 1.0
 * @since     : 23.04.2021
 * 
 *************************************************************************************/
var express = require('express');
var router = express.Router();
const user = require('../controller/user.controller')

router.post("/user", user.createUser);

router.post("/login", user.loginUser);

module.exports = router ;