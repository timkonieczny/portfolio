const path = require("path");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
    mode: "development",
    resolve: {
        alias: {
            Loop: path.resolve(__dirname, "src/js/Loop.dev.ts"),
            URLs: path.resolve(__dirname, "src/js/URLs.dev.js")
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/dev")
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/dev'),
        host: '0.0.0.0',
        historyApiFallback: true
        // TODO: Figure out how to do routing on a production server
        // https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "../report.dev.html",
            openAnalyzer: false
        })
    ],
});