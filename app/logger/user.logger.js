/*********************************************************************************************
 * @description   : It is use create log files for result and error outputs.
 * 
 * @file      : logger.js
 * @overview  : create logger files for user input.
 * @author    : kaushikiarasavilli@gmail.com
 * @version   : 1.0
 * @since     : 2.04.2021
 *
**********************************************************************************************/

const {
  createLogger,
  transports,
  format
} = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: './logger/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: './logger/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
})

module.exports = logger;