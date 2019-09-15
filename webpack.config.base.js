const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./src/js/index.js"],
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
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
            { from: 'src/php/credentials.php', to: 'credentials.php' },
            { from: 'src/.htaccess', to: '' }
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            inject: "head",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                useShortDoctype: true
            },
            title: "Tim Konieczny | Freelance Developer",
            favicon: "./assets/favicon/32x32.png",
            meta: {
                viewport: "width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no",
                "theme-color": "#000000",
                charset: "UTF-8"
            }
        })
    ],
};