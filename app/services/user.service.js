/***********************************************************************************************
 * @purpose   : Used to create user services that will send the data recived from client to 
 *              user.model and save that data in database.
 * 
 * @file      : user.service.js
 * @overview  : create user services and send data to model and save data in database.
 * @author    : kaushikiarasavilli@gmail.com
 * @version   : 1.0   
 * @since     : 23.04.2021
 * 
 **********************************************************************************************/

const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const logger = require('../logger/user.logger')
const { createToken, sendEmail } = require('../utility/helper')

/***********************************************************************************
*@description : To send new user register data to models/user.model
*@param       : req (request from client)
*@param       : callback (response from server)
***********************************************************************************/
class UserServices {

  /***********************************************************************************
  *@description : It is a middleware for create user
  *@param       : req (request from client)
  *@param       : res (response from server)
  ***********************************************************************************/
  createUser = (req, res, callback) => {
    userModel.createUser(req, res, (err, result) => {
      err ? callback(err) : callback(result)
    });
  }

  /***********************************************************************************
  *@description : It is a middleware for user login to generate token
  *@param       : req (request from client)
  *@param       : res (response from server)
  ***********************************************************************************/
  loginUser = (req, res, userLogin) => {
    userModel.loginUser(userLogin, (err, result) => {
      if (result) {
        bcrypt.compare(userLogin.password, result.password, (err, token) => {
          if (token) {
            createToken(token);
            logger.info("login success!")
            res.send({status: 200, token: createToken(token), message: "Token created successfully " })
          }
          else {
            res.send({status: 500, message: "Invalid Details" })
          }
        })
      } else {
        res.send({status: 400, message: "Enter valid Details" })
      }
    })
  }

  /***********************************************************************************
  *@description : It is a middleware for sending tokens to user
  *@param       : req (request from client)
  *@param       : res (response from server)
  ***********************************************************************************/
  forgotPassword = (req, res, userLogin) => {
    userModel.loginUser(userLogin, (err, token) => {
      if (token) {
        createToken(token);
        sendEmail(createToken(token))
        res.send({status: 200, message: "User Registration Token sent successfully" })
      } else {
        logger.error("Email doesnot exist")
        res.send({status: 400, message: "Enter valid Email and Password" })
      }
    })
  }
}

module.exports = new UserServices()