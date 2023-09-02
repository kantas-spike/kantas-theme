# kanta's theme

プログラミング学習記録用の Hugo Theme です。

## 特徴

- データファイルからMyTools、IHCセクション用のGitHubのリポジトリ情報を表示
- Blogだけでなく、TILセクションを用意
- codeblockのフックとして[mermaid.js](https://mermaid-js.github.io/mermaid/#/)に対応

  <pre>
    ~~~mermaid
    flowchart LR
    a-->b
    b-->caa
    ~~~
  </pre>

- シンタックスハイライトCSS(デフォルト: solarized-dark)に対応
- 数式記述のため、codeblockのフックとして[MathJax](https://www.mathjax.org/)に対応

  <pre>
   ~~~mathjax
   \[
      a \x \cos\theta - b \x \sin\theta
   \]
   ~~~
  </pre>

## インストール

本テーマは、`hugo module`としてインストールします。

そのため、以下を実行して、テーマを利用するHugoのサイトをモジュール利用可能にしてください。

~~~shell
cd ${hugoのサイト}
hugo mode init mysite
~~~

さらに、Hugoのサイトでテーマのモジュールをダウンロードします。

~~~shell
$ pwd
${hugoのサイト}
$ hugo module get github.com/kantas-spike/kantas-theme
~~~

そして、`${hugoのサイト}/config.toml`に以下の行を追加して、
テーマのインポートと必要な設定を反映します。

~~~toml
[module]
  # テーマのインポート
  [[module.imports]]
    path = 'github.com/kantas-spike/kantas-theme'
  # テーマで使用するアセットの登録
  [[module.mounts]]
    source = "assets"
    target = "assets"
  [[module.mounts]]
    source = "hugo_stats.json"
    target = "assets/watching/hugo_stats.json"

# テーマで使用するtailwindcss用の設定
[build]
  writeStats = true
  [[build.cachebusters]]
    source = "assets/watching/hugo_stats\\.json"
    target = "theme\\.css"
  [[build.cachebusters]]
    source = "assets/js/.*\\.js"
    target = "theme\\.css"

# テーマで使用するシンタックスハイライト用の設定
[markup.highlight]
  noClasses = false
~~~~

最後に、テーマに必要なパッケージをインストールします。

以下を実行して、テーマで利用しているパッケージをサイト側で収集します。

~~~shell
hugo mod npm pack
~~~

そして、サイト側でパッケージをインストールします。

~~~shell
npm install
~~~

あとは、動作確認です。以下を実行してサーバーを起動します。 そして、をブラウザで開いてサイトが表示されるか確認しましょう。

~~~shell
hugo server
~~~

## その他準備
#### セクションの作成

以下を実行し、セクションのインデックスページを作成してください。
適宜、インデックスページの本文を記載してください。

~~~shell
hugo new -k undraft _index.md
hugo new -k undraft blog/_index.md
hugo new -k undraft til/_index.md
hugo new -k undraft mytools/_index.md
hugo new -k undraft ihc/_index.md
~~~

#### データファイルの作成

[データファイル](#データファイル)に従い、以下のファイルを作成してください。

- data/socialmedia.json

#### シンタックスハイライトの設定

[hugo gen chromastyles](https://gohugo.io/commands/hugo_gen_chromastyles/)で生成したcss(solarized-dark)がテーマに格納されています。

これを有効にするため、**サイト**の`config.toml`に以下を追加してください。

~~~toml
[markup.highlight]
  noClasses = false
~~~

### テーマ側セットアップ： パッケージのインストール

先程インストールした`themes/kantas`ディレクトリに移動して、以下を実行します。

~~~shell
cd ${hugoのサイト}/themes/kantas
npm install
~~~

## データファイル

本テーマは、1つのデータファイルを利用します。

|データファイルパス| 説明 |
|:---|:---|
|`${hugoのサイト}/data/socialmedia.json`| フッタに表示する連絡先を定義します。 |

各データファイルの定義方法を説明します。

### socialmedia.json

フッタに表示する連絡先を定義したJSONファイルです。

~~~json
{
    "accounts":
    [
        {
            "name": "Twitter",
            "icon": "fa-brands fa-twitter-square",
            "url": "https://twitter.com/実際のID"
        },
        {
            "name": "Youtube",
            "icon": "fa-brands fa-youtube-square",
            "url": "https://www.youtube.com/channel/実際のID"
        },
        {
            "name": "GitHub",
            "icon": "fa-brands fa-github-square",
            "url": "https://github.com/実際のID"
        }
    ]
}
~~~

|項目|サブ項目|説明|
|:--:|:--:|:---|
|accounts| - | ソーシャルメディアのアカウント情報を定義した配列 |
| - | name | ソーシャルメディアの名前|
| - | icon | ソーシャルメディアのアイコン。[Font Awesome](https://fontawesome.com/icons/0?s=solid)のアイコン名を使用可能。|
| - | url | ソーシャルメディア アカウントのURL|

## `mytools`および`ihc`セクションのページ

`mytools`および`ihc`セクションのページは、Front Matterのみで構成されます。
そして、Front Matterの`repo`項目にプロジェクト(GitHubのリポジトリ)の情報を設定します。

~~~markdown
{
    "title": "repo-info.py",
    "date": "2023-02-18T01:35:09Z",
    "draft": false,
    "repo": {
        "name": "repo-info.py",
        "full_name": "kantas-spike/repo-info.py",
        "html_url": "https://github.com/kantas-spike/repo-info.py",
        "description": "GitHub REST API\u3092\u4f7f\u3063\u3066\u3001\u8a2d\u5b9a\u30d5\u30a1\u30a4\u30eb\u306b\u5b9a\u7fa9\u3057\u305f\u30ea\u30dd\u30b8\u30c8\u30ea\u306e\u60c5\u5831\u3092\u53d6\u5f97\u3057\u3001`JSON`\u5f62\u5f0f\u3067\u51fa\u529b\u3059\u308b\u30c4\u30fc\u30eb\u3067\u3059\u3002",
        "size": 11,
        "pushed_at": "2023-02-18T01:35:09Z",
        "project_type": "mytools",
        "langs": [
            "Python",
            "Makefile",
            "Shell"
        ],
        "merged": [
            {
                "html_url": "https://github.com/kantas-spike/repo-info.py/pull/2",
                "title": "Feat changing repoinfo from json to indivisual files (fix: #1)",
                "state": "closed",
                "body": null,
                "created_at": "2023-02-02T06:13:23Z",
                "merged_at": "2023-02-02T06:13:31Z",
                "closed_at": "2023-02-02T06:13:31Z",
                "user": "kantas-spike"
            }
        ]
    }
}
~~~

これらのページは、情報収集ツールである[kantas-spike/repo-info.py](https://github.com/kantas-spike/repo-info.py)により生成することを前提にしています。

ツールの使い方、設定方法の詳細は、[kantas-spike/repo-info.py](https://github.com/kantas-spike/repo-info.py)を参照ください。

## TailwindCSS用の`cache buster`の設定

本テーマは、[tailwindcss](https://tailwindcss.com/)を利用しています。
数ある[tailwindcss](https://tailwindcss.com/)のクラスのうち、サイトで利用しているクラスだけを、`assets/css/theme.css`に保存するように設定されています。

しかし、`hugo server`を使って、プレビューしながらサイトのデザインを修正する場合、`assets/css/theme.css`が`Hugo`にキャッシュされるため、サイトに新たな[tailwindcss](https://tailwindcss.com/)のクラスを追加しても、プレビューに反映されません。

その対策として、これまでは、[resources.ExecuteAsTemplateを使ってtheme.cssのファイル名を毎回変更する方法](https://kantas-spike.github.io/portfolio/til/2022/07/13-hugo-with-tailwindcss/#%E6%96%B9%E6%B3%952-hugo%E3%81%AEpostcss%E6%A9%9F%E8%83%BD%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)を採用していました。

ですが素晴らしいことに、[Release v0.112.0 · gohugoio/hugo](https://github.com/gohugoio/hugo/releases/tag/v0.112.0)がリリースされ、TailwindCSS用に`new cache buster`の設定が追加されました。

これにより、`resources.ExecuteAsTemplate`を使ったトリッキーな方法を取らなくても、`theme.css`のキャッシュを管理できるようになりました。

`new cache buster`の設定は以下になります。

テーマを利用するHugoのサイト設定ファイル(hugo.toml or config.toml)で、`new cache buster`設定を追加してください。(参考: [bep/hugo-starter-tailwind-basic: A basic and simple to set up Hugo with TailwindCSS starter project.](https://github.com/bep/hugo-starter-tailwind-basic))

~~~toml
# サイト設定ファイル(hugo.toml or config.toml)

# ..略..
[module]
  [[module.mounts]]
    # hugo_stats.jsonをmountし、Hugoの監視対象に
    source = "hugo_stats.json"
    target = "assets/watching/hugo_stats.json"

[build]
  writeStats = true # hugo_stats.jsonの出力を有効に
  [[build.cachebusters]]
    # hugo_stats.jsonに変更があれば、theme.cssを更新する
    source = "assets/watching/hugo_stats\\.json"
    target = "theme\\.css"

# ..略..
~~~

