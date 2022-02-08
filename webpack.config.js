module.exports = (env) => {
    return require(`./webpack.config.${env.config}.js`)
}