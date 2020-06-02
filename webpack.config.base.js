const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path')

// TODO: Add Hot Component Replacement Plugin
// TODO: Insert head nodes via React Helmet? https://css-tricks.com/its-all-in-the-head-managing-the-document-head-of-a-react-powered-site-with-react-helmet/

const title = "Tim Konieczny. Freelance Software Engineer. 3D and front-end development. Leipzig (Germany / Deutschland)."
const description = "Tim Konieczny, Freelance Software Engineer specializing in 3D and front-end development."
const appName = "Tim Konieczny, Freelance Software Engineer"
const appNameShort = "Tim Konieczny"
const url = "https://timkonieczny.com/"

module.exports = {
    entry: ["./src/js/index.tsx"],
    context: path.resolve(__dirname, "."),
    output: {
        publicPath: '/'
    },
    resolve: {
        extensions: ['.jsx', '.js', '.ts', '.tsx']
    },
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
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(webp|jpg)$/,
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
        new CopyPlugin({
            patterns: [
                { from: 'src/php/credentials.php' },
                { from: 'src/.htaccess' },
                { from: 'assets/card.png' },
                { from: 'src/sitemap.xml' }
            ]
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-webpack-loader!./src/ejs/index.ejs',
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
            title: title,
            type: "website",
            locale: "en_US",
            description: description,
            image: `${url}card.png`,
            imageType: "image/png",
            imageWidth: "1366",
            imageHeight: "715",
            imageAlt: description,
            url: url,
            twitter: "@timkonieczny",
            twitterCard: "summary_large_image",
            meta: {
                viewport: "width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no",
                "format-detection": "telephone=no",
            }
        }),
        new FaviconsWebpackPlugin({
            logo: "./assets/logo.svg",
            publicPath: ".",
            prefix: "/",
            favicons: {
                appName: appName,
                appShortName: appNameShort,
                appDescription: description,
                developerName: "Tim Konieczny",
                developerURL: url,
                dir: "auto",
                lang: "en",
                background: "#1A1A1A",
                theme_color: "#000",
                appleStatusBarStyle: "black-translucent",
                display: "standalone",
                orientation: "any",
                version: "1.0",
                icons: {
                    coast: { background: false },
                    appleIcon: { background: false }
                }
            }
        })
    ],
}