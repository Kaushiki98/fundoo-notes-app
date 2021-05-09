/************************************************************************************
 * @purpose   : Used to create user services that will send the data recived from client to 
 *              user.model and save that data in database.
 * 
 * @file      : user.service.js
 * @overview  : create user services and send data to model and save data in database.
 * @author    : kaushikiarasavilli@gmail.com
 * @version   : 1.0   
 * @since     : 23.04.2021
 * 
 *************************************************************************************/

const userModel = require('../models/user.model')

/**
*@description : To send new user register data to models/user.model
*@param       : req (request from client)
*@param       : callback (response from server)
**/
class UserServices {
  createUser = (req, res, callback) => {
    console.log(JSON.stringify(req.body.firstName));
    userModel.createUser(req, res, (err, result) => {
      err ? callback(err) : callback(result)
    });
  }

  loginUser = (userLogin, callback) => {
    console.log(JSON.stringify(userLogin.email));
    userModel.loginUser(userLogin, callback )//=> {
   //   err ? callback(err) : callback(result)
  //  })
  }
}

module.exports = new UserServices()