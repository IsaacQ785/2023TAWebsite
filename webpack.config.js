// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: './src/trading-app/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public.html",
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?/,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
