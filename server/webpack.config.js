const path = require('path')
const webpack = require('webpack')

const environment = process.env.ENVIRONMENT

console.log('environment:::::', environment)

let ENVIRONMENT_VARIABLES = {
    'process.env.HOST': process.env.HOST,
    'process.env.USER': process.env.USER,
    'process.env.PASSWORD': process.env.PASSWORD,
    'process.env.DB': process.env.DB,
    'process.env.DIALECT': process.env.DIALECT,
    'process.env.PORT': process.env.PORT,
    'process.env.PG_CONNECTION_STR': process.env.PG_CONNECTION_STR,
}

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs',
    },
    target: 'node',
    plugins: [new webpack.DefinePlugin(ENVIRONMENT_VARIABLES)],
    //externals: ['pg', 'pg-hstore']
    externals: [
        { pg: { commonjs: ['pg'] } },
        { 'pg-hstore': { commonjs: ['pg-hstore'] } },
    ],
}
