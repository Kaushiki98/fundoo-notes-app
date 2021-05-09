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
const logger = require('../utility/logger')
var jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const ACCESS_JWT_SECRET = "kasaks"

const LoginValidation = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
})

class userController {

  /**
  *@description : To handle regester of new user
  *@param       : req (request from client)
  *@param       : res (response from server)
  **/
  createUser = (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      response.success = false;
      response.error = errors;
      return res.status(422).send(response);
    }
    else {
      userService.createUser(req, res, (err, result) => {
        if (err) {
          logger.error("Some error occured");
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

  /**
  *@description : To handel login details of user
  *@param       : req (request from client)
  *@param       : res (response from server)
  **/
  loginUser = (req, res) => {
    const userLogin = {
      email: req.body.email,
      password: req.body.password,
      
    };
    console.log(userLogin.password);
    console.log(userLogin.email);

    var error = validationResult(req);
    const validation = LoginValidation.validate(userLogin);
    if (validation.error) {
      response.success = false;
      response.error = error;
      res.status(400).send(response)
    } else {
      userService.loginUser(userLogin, (err, result) => {
        if (err) {          
          logger.err("Error is occuring while login")
          res.status(500).send({
            message: err
          })
        } else {
          bcrypt.compare(userLogin.password, result[0].password, (err, data) => {
            if (data) {
              const token = jwt.sign({email: result.email, id: result.id}, ACCESS_JWT_SECRET) 
              result.token = token;              
              logger.info("login success!")
              res.status(200).send({ token: result.token, message: "success" })
            }
            else {
              res.status(500).send({ message: "invalid" })
            }
          })
        }
      })
    }
  }
}
module.exports = new userController()