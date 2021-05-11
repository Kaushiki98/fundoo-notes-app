const express = require('express');
const swaggerUI = require('swagger-ui-express');
const logger = require('./app/logger/user.logger');
const swaggerJSDoc = require('./app/swagger.json')
require("dotenv").config();

let port = process.env.PORT;

// create express app
const app = express();

// parse requedst of content-type application
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type application/json
app.use(express.json())

// configuring the database
const dbConfig =  require('./app/config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Conneting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  logger.info("Successfully connected to the database");
}).catch(err => {
  logger.error('could not connect to the database. Exiting now...', err);
  process.exit();
})

app.use(require('./app/routes/user.route'));

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc))

//define a simple route
app.get('/', (res) => {
  res.json({"Message" : "Welcome to Fundoo Notes"})
});

// listen for requests
app.listen(port, () => {
  logger.info(`Server is listening localhost: ${port}`);
});