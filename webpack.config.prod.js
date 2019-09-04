const path = require("path");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    mode: "production",
    resolve: {
        alias: {
            Loop: path.resolve(__dirname, "src/js/Loop.js")
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/prod")
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/prod'),
        host: '0.0.0.0'
    },
});