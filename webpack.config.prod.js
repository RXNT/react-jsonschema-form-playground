var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "react-jsonschema-form-playground.js",
        publicPath: "/static/"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    resolve: {
      modules: [
        "node_modules",
        path.resolve(__dirname, "app")
      ],
      extensions: [".js", ".css"],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "node_modules", "codemirror", "mode", "javascript"),
                ],
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader"),
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "node_modules"),
                ],
            }
        ]
    }
};
