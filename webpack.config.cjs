const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.tsx',
        output: {
            filename: isProduction ? '[name].[contenthash].js' : '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name].[hash][ext][query]'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './public/favicon.ico'
            }),
            new CleanWebpackPlugin(),
            new Dotenv()
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'public')
            },
            compress: true,
            port: 3000,
            historyApiFallback: true
        },
        optimization: isProduction ? {
            minimize: true,
            splitChunks: {
                chunks: 'all'
            }
        } : {}
    };
};
