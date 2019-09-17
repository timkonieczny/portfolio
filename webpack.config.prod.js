const path = require("path");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const Secret = require("./secret.js");

module.exports = merge(baseConfig, {
    mode: "production",
    resolve: {
        alias: {
            Loop: path.resolve(__dirname, "src/js/Loop.js"),
            URLs: path.resolve(__dirname, "src/js/URLs.js")
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
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "../report.prod.html",
            openAnalyzer: false
        }),
        new HtmlWebpackPartialsPlugin([{
            path: './src/google-tag-manager.html',
            location: 'head',
            priority: 'high',
            options: {
                gtm_id: Secret.analytics.google,
            }
        }])
    ],
});