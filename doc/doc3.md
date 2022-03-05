# \[React]\[TypeScript] Hello World的なもの(2022年1月版)(^^;)(3) 静的なページとReact使った別ページを追加してみる。


[\[React\]\[TypeScript\] Hello World的なもの(2022年1月版)(^^;)(2) Firefoxでデバッグしてみる。](https://m-miya.blog.jp/archives/1079395418.html)に静的なページとReactを使った動的なページ(動的と言っても実際に追加するのはReact使ってるけど全然動的ではない)を追加してみる。

まず、元々のindex.thmlをindex1.thmlとしてそこで使っているtsxファイルもそれぞれindex1.tsx、App1.tsxに変更する。ソースコード内のApp関数もApp1に変更しておく。

追加する静的なページはindex.htmlとして次のようなものを追加する。

*index.html*
~~~html
<!DOCTYPE html>
<html lang="ja">
    <header>
        <meta charset="utf-8">
    </header>
    <body>
        <ul>
            <li><a href="index1.html">押してボタンのあるHello world的なページ</a></li>
            <li><a href="index2.html">Hello World</a></li>
        </ul>
    </body>
</html>
~~~

追加する別の動的なページはindex2.html、index2.tsx、App2.tsxとして次のようなものを追加する。(しつこく書いておくがReactを使っているだけで全然動的ではない(^^;))
(実際のところWebpackの設定ファイルにどのように書くかを書いて残しておきたいだけなので書かなくてもよさげ)

*index2.html*
~~~html
<!DOCTYPE html>
<html lang="ja">
    <header>
        <meta charset="utf-8">
        <!-- app.jsなどのjsファイルを読み込む部分のタグは
            webpackのhtml-loaderプラグインで勝手に
            追加してくれるので記述しない。 -->
    </header>
    <body>
        <div id="root"></div>
    </body>
</html>
~~~

*index2.tsx*
~~~typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App2 } from "./App2";

ReactDOM.render(
    <App2 />,
    document.getElementById('root')
);
~~~

*App2.tsx*
~~~typescript
import React from "react";

export const App2 = ()=>{
    return <div>
        <p>Hello World!</p>
    </div>;
}
~~~

webpack.config.common.jsを次のように変更する。ページごとにpluginsにnew HtmlWebpackPlugin()を追加する。静的なページの場合inject:falseを指定しておく。動的なページで使うjavascirptはchunkでしてするとhtmlにscriptタグで追加される。

*webpack.config.common.js*
~~~javascript

...(省略)

module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        app1:'./src/index1.tsx',
        app2:'./src/index2.tsx',
    },

...(省略)

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

...(省略)

};
~~~

[github](https://github.com/miyamoto999/helloworld_ts/tree/V3)にコードを投稿しておいた。