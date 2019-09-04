const path = require("path");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    mode: "development",
    resolve: {
        alias: {
            Loop: path.resolve(__dirname, "src/js/Loop.dev.js")
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/dev")
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/dev'),
        host: '0.0.0.0'
    },
});