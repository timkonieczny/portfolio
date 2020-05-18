const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// TODO: Add Hot Component Replacement Plugin
// TODO: Insert head nodes via React Helmet? https://css-tricks.com/its-all-in-the-head-managing-the-document-head-of-a-react-powered-site-with-react-helmet/

module.exports = {
    entry: ["./src/js/index.tsx"],
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
                test: /\.webp$/,
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
                { from: 'assets/card.png' }
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
            title: "Tim Konieczny | Freelance Developer",
            type: "website",
            locale: "en_US",
            description: "I specialize in computer graphics, digital experiences and front-end development.",
            image: "https://timkonieczny.com/card.png",
            imageType: "image/png",
            imageWidth: "1366",
            imageHeight: "715",
            imageAlt: "A 3D scene. The headline reads: Hello, I'm Tim, Freelance Developer.",
            url: "https://timkonieczny.com/",
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
                appName: "Tim Konieczny",
                appShortName: "Tim Konieczny",
                appDescription: "I specialize in computer graphics, digital experiences and front-end development.",
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
}