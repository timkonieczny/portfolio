const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const Secret = require("./secret.js")

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
            { from: 'src/.htaccess', to: '' },
            { from: 'assets/card.png', to: '' }
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
                minifyJS: true,
                useShortDoctype: true
            },
            title: "Tim Konieczny | Freelance Developer",
            street: Secret.street,
            city: Secret.city,
            country: Secret.country,
            phone: Secret.phone,
            email: Secret.email,
            meta: {
                viewport: "width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no",
                "og:title": "Tim Konieczny | Freelance Developer",
                "og:site_name": "Tim Konieczny | Freelance Developer",
                "og:description": "I'm a freelance developer, specializing in web frontend, 3D and Android development.",
                "og:image": "https://timkonieczny.com/card.png",
                "og:url": "https://timkonieczny.com",
                "twitter:card": "summary_large_image",
                "twitter:image:alt": "A 3D scene. The headline reads: Hello, I'm Tim, Freelance Developer.",
                "twitter:site": "@timkonieczny",
                "twitter:content": "@timkonieczny",
            }
        }),
        new FaviconsWebpackPlugin({
            logo: "./assets/logo.svg",
            prefix: "",
            favicons: {
                appName: "Tim Konieczny | Freelance Developer",
                appShortName: "Tim Konieczny",
                appDescription: "I'm a freelance developer, specializing in web frontend, 3D and Android development.",
                developerName: "Tim Konieczny",
                developerURL: "Tim Konieczny",
                dir: "auto",
                lang: "en-US",
                background: "#1A1A1A",
                theme_color: "#000",
                appleStatusBarStyle: "black-translucent",
                display: "standalone",
                orientation: "any",
                version: "1.0"
            }
        })
    ],
};