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

/***********************************************************************************
 * @description   : Validating login credentials getting from the user 
 * @module        : Useing of JOI
************************************************************************************/
const LoginValidation = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
})

/**********************************************************************************
 * @description   : creating token using jsonwebtoken module
 * @param         : getting result from postmen
 * @module        : using JWT
**********************************************************************************/
const createToken = (result) => {
  const token = JWT.sign({ email: result.email, id: result.id }, process.env.ACCESS_JWT_ACTIVATE, { expiresIn: '1h' });
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

  EJS.renderFile('sendMail', (err, result) => {
    if (err) {
      logger.error("error")
    } else {
      var mailLink = {
        from: process.env.EMAILFROM,
        to: process.env.EMAILTO,
        subject: 'Sending Email using Node.js',
        html: `${result.token}<a href = "${'http://localhost:3000/resetPassword/'}${createToken(result)}">`
      };
      transporter.sendMail(mailLink, (error, info) => {
        if (error) {
          logger.error(error);
        } else {
          logger.info('Email sent: ' + info.response);
        }
      })
    }
  })
}

module.exports = { LoginValidation, createToken, sendEmail }