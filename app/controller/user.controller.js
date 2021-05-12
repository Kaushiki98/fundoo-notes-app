/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 * 
 * @file      : user.controller.js
 * @overview  : Methods for all CRUD operation of user.
 * @author    : kaushikiarasavilli@gmail.com
 * @version   : 1.0
 * @since     : 24.04.2021
 * 
 *************************************************************************************/

const { response } = require('express');
const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const logger = require('../logger/user.logger')
const { RegisterValidation, LoginValidation, createToken } = require('../utility/helper')

class userController {

  /***********************************************************************************
  *@description : To handle regester of new user
  *@param       : req (request from client)
  *@param       : res (response from server)
  ***********************************************************************************/
  createUser = (req, res) => {
    const userRegisteration = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    const validation = RegisterValidation.validate(userRegisteration);

    if (validation.error) {
      return res.send({ 
        status: 400,
        message: "Please Enter Valid Details" });
      
    }
    else {
      userService.createUser(req, res, (err, result) => {
        if (err) {
          logger.error("Some error occured while registering user");
          return res.send({
            status: 500,
            message: "error"
          })
        }
        else {
          return res.send({
            status: 200,
            success: true,
            message: "User registered sucessfully"
          });
        }
      });
    }
  }

  /***********************************************************************************
  *@description : To handel login details of user
  *@param       : req (request from client)
  *@param       : res (response from server)
  ***********************************************************************************/
  loginUser = (req, res) => {
    const userLogin = {
      email: req.body.email,
      password: req.body.password
    };
    const validation = LoginValidation.validate(userLogin);

    if (validation.error) {
      return res.send({ 
        status: 400,
        message: "Please Enter Valid Details" });
    } else {
      userService.loginUser(req, res, userLogin)
    }
  }

  /***********************************************************************************
  *@description : To handel forgot password of registered user
  *@param       : req (request from client)
  *@param       : res (response from server)
  ***********************************************************************************/
  forgotPassword = (req, res) => {
    const userLogin = {
      email: req.body.email
    }
    userService.forgotPassword(req, res, userLogin)
  }
}

module.exports = new userController()