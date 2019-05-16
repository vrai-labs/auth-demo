var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '');
var APP_DIR = path.resolve(__dirname, '');

var config = {
  entry: APP_DIR + '/frontend/build/index.js',
  output: {
    path: BUILD_DIR + '/',
    filename: 'bundle.js'
  }
};

module.exports = config;
