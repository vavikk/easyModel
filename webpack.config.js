var webpack = require("webpack");

module.exports = {
    entry:{
        app: './spec/app.ts'
    },
    output:{
        filename:"[name].js",
        path: __dirname + '/public',
        libraryTarget: 'var',
        library: 'Model'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.json']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader:"ts-loader" },
            {test: /\.json$/, loader: "json-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin( {
            debug: false,
            minimize: true
        })
    ],
    devtool: "source-map"
}

