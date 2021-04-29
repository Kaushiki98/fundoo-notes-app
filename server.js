const express = require('express')

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
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('could not connect to the database. Exiting now...', err);
  process.exit();
})

app.use(require('./app/routes/user.route'));

//define a simple route
app.get('/', (req, res) => {
  res.json({"Message" : "Welcome to Fundoo Notes"})
});

// listen for requests
app.listen(2000,  () => {
  console.log("Server is listening on port 3000");
});