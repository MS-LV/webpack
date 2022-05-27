const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV == 'development';
const isProduct = !isDev;
const cssLoaders = (extra) => {
    const loader = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'];
    if (extra) {
        loader.push(extra);
    }
    return loader
}
const babelOptions = (preset) => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
    if (preset) {
        opts.presets.push(preset)
    }
    return opts
}
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isProduct) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
module.exports = {
    //? context:path.resolve(__dirname, 'src')  => Абсолутный пут дествует ко всем ссылкам
    mode: 'development', // ==> mode:"production" || "production"
    entry: {
        mained: ['@babel/polyfill', './src/index.jsx'],
        last: './src/analytics.ts'  //? нужний файли 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: '[name].[hash].[chunkhash].bundle.js',
        //filename: '[name].[hash].bundle.js' //? <-- паттерн
        filename: filename('js')
    },
    //options: {
    optimization: optimization(),
    //},
    devServer: {
        port: 4200,
        hot: isDev,   //?   <-- "webpack-dev-server"
    },
    devtool: isDev ? 'source-map' : 'eval',
    resolve: {
        //extension: ['.js', '.json', '.png', '.xml', '.csv']
        /* alias: {
            '@models': path.resolve(__dirname, 'src')
        } */
    },
    plugins: [
        new HTMLWebpackPlugin({
            //title: "my webpack Project",
            template: './src/indexOne.html',
            minify: {
                collapseWhitespace: isProduct
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/img/favicon.jpg'), to: path.resolve(__dirname, 'dist') },
                //{ from: path.resolve(__dirname, 'src/styles/style.css'), to: path.resolve(__dirname, 'dist') } //<< < можно выкладиват несколько файлов
            ],
        }),
        new MiniCssExtractPlugin({
            //filename: '[name].[chunkhash].css'
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                //use: ['file-loader'],
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions()
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            },
            /* {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, */
        ]
    }
};
//console.log(isDev)
if (isDev) {
    console.log('>>> Режим Разработка <<<')
} else {
    console.log('>>> Режим Production <<<')
}