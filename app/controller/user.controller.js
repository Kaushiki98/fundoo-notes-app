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
const { LoginValidation, createToken } = require('../utility/helper')

class userController {

  /***********************************************************************************
  *@description : To handle regester of new user
  *@param       : req (request from client)
  *@param       : res (response from server)
  ***********************************************************************************/
  createUser = (req, res) => {

    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      response.success = false;
      response.error = errors;
      return res.status(422).send(response);
    }
    else {
      userService.createUser(req, res, (err, result) => {
        if (err) {
          logger.error("Some error occured while registering user");
          return res.status(500).send({
            message: err
          })
        }
        else {
          return res.status(200).send({
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    var error = validationResult(req);
    const validation = LoginValidation.validate(userLogin);
    if (validation.error) {
      response.success = false;
      response.error = error;
      res.status(400).send(response)
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