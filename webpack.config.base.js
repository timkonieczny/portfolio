const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./src/js/index.js"],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.glsl$/,
                loader: "webpack-glsl-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.svg$/,
                exclude: /credentials.php/,
                use: [
                    'svg-loader'
                ]
            },
            {
                test: /\.php$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/php/credentials.php', to: 'credentials.php' },
        ]),
    ],
};