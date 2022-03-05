const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        app1:'./src/index1.tsx',
        app2:'./src/index2.tsx',
    },
    // ファイルの出力設定
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
    },
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                // 拡張子 .ts もしくは .tsx の場合
                test: /\.tsx?$/,
                // TypeScript をコンパイルする
                use: 'ts-loader'
            },
            {
                // 拡張子.htmlの場合
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    // import 文で .ts や .tsx ファイルを解決するため
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.jsx', '.json'
        ],
    },

    // webサーバーの設定
    devServer: {
        static: "dist",
        port: 8080,
        open: true,
    },

    // htmlファイルの設定
    // ※ htmlファイル名がイマイチだがこれでいく。
    plugins: [
        new HtmlWebpackPlugin({     // 静的なページ
            template: './src/index.html',
            filename: 'index.html',
            inject: false,      // ← これでscriptタグが追加されない
        }),
        new HtmlWebpackPlugin({     // 押してボタンのあるHello World的なページ
            template: './src/index1.html',
            filename: 'index1.html',
            chunks: ['app1'],            // ← これでapp1.jsが追加される
        }),
        new HtmlWebpackPlugin({     // 別のReactを使った動的なページ
            template: './src/index2.html',
            filename: 'index2.html',
            chunks: ['app2'],           // ← これでapp2.jsが追加される
        })
    ],

    optimization: {
        splitChunks: {
          chunks: "all",
          minSize: 0,
          // node_modulesのjsを別ファイル(vendors.js)に出力するように設定
          cacheGroups: {
            vendor: {
              name: "vendors",
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
            },
            default: false,
          },
        },
    }
};
