const HtmlWebPackPlugin = require('html-webpack-plugin')
const minicss= require('mini-css-extract-plugin')
const Optimizecss= require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports= {

    mode: 'production',
    optimization: {
        minimizer: [new Optimizecss()]
    },
    output:{

        filename: 'main.[contentHash].js'
    },
    module: {
        rules:  [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use:[
                     "babel-loader"   
                ]

                    
            },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/i,
                use: [
                    minicss.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i, //si es un archivo html use:
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                },
                
            },
            {
                test:/\.(png[svg][jpg][gif])$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
                ]
        
    },
    plugins: [
        new HtmlWebPackPlugin ({
            template: './src/index.html',
            filename: './index.html'
        }),
        new minicss({
            filename:'[name].[contentHash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/'},
            ],
          }),
          new MinifyPlugin(),
          new CleanWebpackPlugin(),
    ]

}