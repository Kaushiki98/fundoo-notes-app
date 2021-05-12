/************************************************************************************
 * @purpose   : For keeping all configurations 
 * 
 * @file      : database.config.js
 * @overview  : contains name and address of database (mongodb).
 * @author    : kaushikiarasavilli@gmail.com
 * @version   : 1.0
 * @since     : 24.04.2021
 * 
 *************************************************************************************/
 require("dotenv").config();

module.exports = {
  url: process.env.DB_URL
}