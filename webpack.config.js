const path = require('path');

module.exports = {
    entry: path.join(__dirname,'js', 'app'),
    output: {
        path: path.join(__dirname,'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './public',
        colors: true,
        historyApiFallback: true,
        inline: true,
        port: 8080
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.join(__dirname,'js')
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/, query: {presets:["react","es2015"]} },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
};
