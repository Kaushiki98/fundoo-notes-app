var blueBird = require('bluebird');
var mongoose = require('mongoose');
require('dotenv').config();

('use strict');

var DEBUG_CONNECTING = 'Connecting to db server %s...';
var DEBUG_ALREADY_CONNECTED = 'Already connected to db server %s.';
var DEBUG_ALREADY_CONNECTING = 'Already connecting to db server %s.';
var DEBUG_CONNECTED = 'Successfully connected to db server %s.';
var DEBUG_CONNECTION_ERROR = 'An error has occured while connecting to db server %s.';
var DEBUG_DISCONNECTING = 'Disconnecting from db server %s...';
var DEBUG_ALREADY_DISCONNECTED = 'Already disconnected from db server %s.';
var DEBUG_ALREADY_DISCONNECTING = 'Already disconnecting from db server %s.';
var DEBUG_DISCONNECTED = 'Successfully disconnected from db server %s.';
var DEBUG_DISCONNECTION_ERROR = 'An error has occured while disconnecting from db server %s.';

var isState = function (state) {
  return mongoose.connection.readyState === mongoose.Connection.STATES[state];
};

function MongoDBAdapter(uri, options) {
  this.uri = uri;
  this.options = options;
}

MongoDBAdapter.prototype.addConnectionListener = function (event, cb) {
  var listeners = mongoose.connection._events;
  if (!listeners || !listeners[event] || listeners[event].length === 0) {
    mongoose.connection.once(event, cb.bind(this));
  }
};

MongoDBAdapter.prototype.connect = function () {
  return new blueBird(
    function (resolve, reject) {
      if (isState('connected')) {
        console.log(DEBUG_ALREADY_CONNECTED);
        return resolve(this.uri);
      }

      this.addConnectionListener('error', function (err) {
        console.log(DEBUG_CONNECTION_ERROR, this.uri);
        return reject(err);
      });

      this.addConnectionListener('open', function () {
        console.log(DEBUG_CONNECTED, this.uri);
        return resolve(this.uri);
      });

      if (isState('connecting')) {
        console.log(DEBUG_ALREADY_CONNECTING, this.uri);
      } else {
        console.log(DEBUG_CONNECTING, this.uri);
        mongoose.connect(this.uri, this.options);
      }
    }.bind(this)
  );
};

MongoDBAdapter.prototype.disconnect = function () {
  return new blueBird(
    function (resolve, reject) {
      if (isState('disconnected') || isState('uninitialized')) {
        console.log(DEBUG_ALREADY_DISCONNECTED, this.uri);
        return resolve(this.uri);
      }

      this.addConnectionListener('error', function (err) {
        console.log(DEBUG_DISCONNECTION_ERROR, this.uri);
        return reject(err);
      });

      this.addConnectionListener('disconnected', function () {
        console.log(DEBUG_DISCONNECTED, this.uri);
        return resolve(this.uri);
      });

      if (isState('disconnecting')) {
        console.log(DEBUG_ALREADY_DISCONNECTING, this.uri);
      } else {
        console.log(DEBUG_DISCONNECTING, this.uri);
        mongoose.disconnect();
      }
    }.bind(this)
  );
};

module.exports = MongoDBAdapter;