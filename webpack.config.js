const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    //? context:path.resolve(__dirname, 'src')  => Абсолутный пут дествует ко всем ссылкам
    //? mode: 'development', // ==> mode:"production" || "production"
    entry: {
        main: './src/index.js',
        anlytics: './src/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].[chunkhash].bundle.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "my webpack Project",
            template: "./src/indexOne.html",
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['file-loader']
            }

        ]
    }
};