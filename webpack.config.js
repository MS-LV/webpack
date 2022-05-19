const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    //? context:path.resolve(__dirname, 'src')  => Абсолутный пут дествует ко всем ссылкам
    //? mode: 'development', // ==> mode:"production" || "production"
    entry: {
        main: './src/index.js',
        last: './src/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: '[name].[hash].[chunkhash].bundle.js',
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            chunk: 'all'
        }
    },
    devServer: {

        port: 4200
    },
    resolve: {
        //extension: ['.js', '.json', '.png', '.xml', '.csv']
        /* alias: {
            '@models': path.resolve(__dirname, 'src')
        } */
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
                test: /\.(jpg|png|gif|svg)$/,
                use: ['file-loader'],
            },
            /* {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            } */
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
};