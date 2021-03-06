const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV == 'development';
const isStatus = process.env.NODE_ENV == 'status';
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
const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
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
const plugins = () => {
    const base = [
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
                //{ from: path.resolve(__dirname, 'src/styles/style.css'), to: path.resolve(__dirname, 'dist') } //<< < ?????????? ???????????????????? ?????????????????? ????????????
            ],
        }),
        new MiniCssExtractPlugin({
            //filename: '[name].[chunkhash].css'
            filename: filename('css')
        })
    ];
    if (isStatus) {
        base.push(new BundleAnalyzerPlugin()) //? ?????????????? ????????????
    }
    return base;
}
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
module.exports = {
    //? context:path.resolve(__dirname, 'src')  => ???????????????????? ?????? ???????????????? ???? ???????? ??????????????
    mode: 'development', // ==> mode:"production" || "production"
    entry: {
        mained: ['@babel/polyfill', './src/index.jsx'],
        last: './src/analytics.ts'  //? ???????????? ?????????? 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: '[name].[hash].[chunkhash].bundle.js',
        //filename: '[name].[hash].bundle.js' //? <-- ??????????????
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
    plugins: plugins(),
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
                use: jsLoaders()
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
}

if (isDev) {
    console.log('>>> ?????????? ???????????????????? <<<')
} else if (isProduct) {
    console.log('>>> ?????????? Production <<<')
} else {
    console.log('>>> ?????????? ?????????????????????? ???????????????????? <<<')
}