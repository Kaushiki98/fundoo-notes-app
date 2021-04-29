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

const { validationResult } = require('express-validator');
const userService = require('../services/user.service');

/**
*@description : To handel regester of new user
*@param       : req (request from client)
*@param       : res (response from server)
**/

class userController {
  createuser = (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    console.log("firstname :: " + user.firstName);
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      response.success = false;
      response.error = errors;
      return res.status(422).send(response);
    }
    else {
      userService.createUser(req, res, (err, result) => {
        if (err) {
          console.log(err);
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
}
module.exports = new userController()