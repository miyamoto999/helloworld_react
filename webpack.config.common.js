const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        app:'./src/index.tsx',
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
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
