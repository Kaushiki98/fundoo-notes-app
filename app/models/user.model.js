
/************************************************************************************
 * @purpose   : creats user schema and stores data in database.
 * 
 * @file      : user.model.js
 * @overview  : stores user data to database.
 * @author    : kaushikiarasavilli@gmail.com
 * @version   : 1.0
 * @since     : 24.04.2021
 * 
 *************************************************************************************/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { body } = require('express-validator');

//create instance of schema
const mongoSchema = mongoose.Schema;

const userSchema = new mongoSchema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    required: true
  }
});

const dbuserschema = mongoose.Schema(userSchema);
const dbUserModel = mongoose.model('user', dbuserschema);

function hash(password) {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

const validation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required()
})

class user {

  /**
  *@description : To register new user to the database.
  *@param       : body (request from client)
  *@param       : callback (response from server)
  **/
  createUser = (req, res, callback) => {
    const newUser = new dbUserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash(req.body.password),
    });

    newUser.save()
      .then((data) => {
        console.log("Success");
        res.send(data);
      }).catch((err) => {
        console.log(err);
        res.send(err)
      })
  }

  /**
  *@description : To login new user into the database.
  *@param       : body (request from client)
  *@param       : callback (response from server)
  **/
  loginUser = (userLogin, callback) => {
    console.log({ email:userLogin.email  })
    dbUserModel.find({email:userLogin.email}, callback )
  };
}

module.exports = new user()