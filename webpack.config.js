const path = require('path');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./client/src/index.js"),
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["babel-plugin-styled-components"]
          }
        }
      },
      {
        test: /\.css$/, // styles files
        use: ["css-loader"],
      },
    ]
  },
}