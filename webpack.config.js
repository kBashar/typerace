var path = require("path");
module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  module: {
      preLoaders: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'jshint-loader'

     }
  ],
    loaders: [
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['','.js','.es6']
  }
}