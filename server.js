const express = require('express');
const swaggerUI = require('swagger-ui-express');
const logger = require('./app/logger/user.logger');
const swaggerJSON = require('./app/swagger.json')
require("dotenv").config();

let port = process.env.PORT;

// create express app
const app = express();

// parse request of content-type application
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type application/json
app.use(express.json())

require('./app/config/database.config');

app.use(require('./app/routes/user.route'));

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJSON))

app.get('/', (res) => {
  res.json({"Message" : "Welcome to Fundoo Notes"})
});

app.listen(port, () => {
  logger.info(`Server is listening localhost: ${port}`);
});

module.exports = app;