var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: __dirname,
  entry: './src/index.jsx',
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader?presets[]=es2015&presets[]=react'
    }]
  },
  output: {
    path: path.join(__dirname, "..", "static", "javascript"),
    filename: "dwata.js"
  }
};