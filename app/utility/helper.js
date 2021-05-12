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
const EJS = require('ejs')
const logger = require('../logger/user.logger');

const RegisterValidation = Joi.object({
  firstName: Joi.string().required().pattern(new RegExp('^[A-Z][a-z]{3,}$')),
  lastName: Joi.string().required().pattern(new RegExp('^[A-Z][a-z]{3,}$')),
  email: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')),
  password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*?[0-9]).{5,}$')),
});

/***********************************************************************************
 * @description   : Validating login credentials getting from the user 
 * @module        : Useing of JOI
************************************************************************************/
const LoginValidation = Joi.object().keys({
  email: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')),
  password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*?[0-9]).{5,}$'))
})

/**********************************************************************************
 * @description   : creating token using jsonwebtoken module
 * @param         : getting result from postmen
 * @module        : using JWT
**********************************************************************************/
const createToken = (result) => {
  return JWT.sign({ result }, process.env.ACCESS_JWT_ACTIVATE, { expiresIn: '1h' });
}

/**********************************************************************************
 * @description   : sending an emails using nodemailer
 * @param         : sending mails from server 
 * @module        : nodemailer
**********************************************************************************/
const sendEmail = (token) => {

  let transporter = nodeMailer.createTransport({
    service: 'GMail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
  });
  EJS.renderFile('app/view/sendEmail.ejs', (err, result) => {
    if (err) { 
      logger.error("error")
    } else {     
      var mailOptions = { 
        from: process.env.EMAIL,
        to: process.env.EMAIL2,
        subject: 'To Reset Password',
        html: `${result} ${'http://localhost:3000/resetPassword/'}${createToken(token)}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
        } else {
          logger.info('Email sent: ' + info.response);
        }
      })
    }
  })
}

module.exports = { RegisterValidation, LoginValidation, createToken, sendEmail }