/******************************************************************************************
 * @purpose   : Use to validate the inputs using joi and create tokens using JWT.
 * 
 * @file      : helper.js
 * @overview  : Validate the inputs getting from clients.
 * @author    : kaushikiarasavilli@gmail.com
 * @version   : 1.0   
 * @since     : 10.05.2021
 * 
 ******************************************************************************************/

const Joi = require('joi');
const JWT = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
require('dotenv').config();

/***********************************************************************************
 * @description   : Validating login credentials getting from the user 
 * @module        : Useing of JOI
************************************************************************************/
const LoginValidation = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})

/**********************************************************************************
 * @description   : creating token using jsonwebtoken module
 * @param         : getting result from postmen
 * @module        : using JWT
**********************************************************************************/
const createToken = (result) => {
  const token = JWT.sign({ email: result.email, id: result.id }, process.env.ACCESS_JWT_ACTIVATE, {expiresIn: '1h'});
  result.token = token;
}

/**********************************************************************************
 * @description   : sending an emails using nodemailer
 * @param         : sending mails from server 
 * @module        : nodemailer
**********************************************************************************/
const sendEmail = () => {
  let transporter = nodeMailer.createTransport({
    service: 'GMail',
    auth: {
      user: process.env.EMAILFROM,
      pass: process.env.PASSWORD
    },
  });

  var mailOptions = {
    from: process.env.EMAILFROM,
    to: process.env.EMAILTO,
    subject: 'Sending Email using Node.js',
    text: `Token to reset password . Go to ${'http://localhost:3000/forgotPassword/'}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

module.exports = { LoginValidation, createToken, sendEmail }