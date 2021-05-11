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

// post method to create new user
router.post("/userRegistration", user.createUser);

//post method to login user
router.post("/userLogin", user.loginUser);

//put method to reset password of user
router.put("/forgotPassword", user.forgotPassword);

module.exports = router ;