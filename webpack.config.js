const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
        ignored: /node_modules/,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
    ],

    resolve: {
        extensions: ['*', '.ts', '.js'],
        alias: {
            "handlebars" : "handlebars/dist/handlebars.js"
        },
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    devServer: {
        historyApiFallback: true,
        liveReload: true,
        compress: true,
        port: 1234,
    },
};
