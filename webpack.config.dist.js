var webpack = require("webpack");
var path = require("path");

module.exports = {
  cache: true,
  context: __dirname + "/src",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: "react-jsonschema-form-playground.js",
    library: "JSONSchemaFormPlayground",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  devtool: "source-map",
  externals: {
    react: {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react"
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, "css"),
          path.join(__dirname, "node_modules"),
        ],
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
};