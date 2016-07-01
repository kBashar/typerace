module.exports = {
  entry: "./abtest/racecontroller.js",
  output: {
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
        test: [/\.es6$/],
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
