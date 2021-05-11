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

//create instance of schema
const mongoSchema = mongoose.Schema;

const userSchema = new mongoSchema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true }
}, { timestamps: true });

const dbuserschema = mongoose.Schema(userSchema);
const UserModel = mongoose.model('user', dbuserschema);

function hash(password) {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

class user {

  /***********************************************************************************
  *@description : To register new user to the database.
  *@param       : body (request from client)
  *@param       : callback (response from server)
  ***********************************************************************************/
  createUser = (req, res) => {

    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash(req.body.password),
    });
    UserModel.findOne({ email: req.body.email }, (err, data) => {
      if (data) {
        return res.status(500).send({
          message: "Email already exists"
        })
      }
      else {
        newUser.save()
          .then((data) => {
            console.log("Success");
            res.send(data);
          }).catch((err) => {
            console.log(err);
            res.send(err)
          })
      }
    })
  }

  /***********************************************************************************
  *@description : To login new user into the database.
  *@param       : body (request from client)
  *@param       : callback (response from server)
  ***********************************************************************************/
  loginUser = (userLogin, callback) => {
    UserModel.findOne({ email: userLogin.email }, callback)
  };

  /***********************************************************************************
  *@description : To send mail for reset password.
  *@param       : body (request from client)
  *@param       : callback (response from server)
  ***********************************************************************************/
  forgotPassword = (userLogin, callback) => {
    UserModel.findOne({ email: userLogin.email }, callback)
  };
}

module.exports = new user()