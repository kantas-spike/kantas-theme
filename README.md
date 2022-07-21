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

## インストール

本テーマは、`git`の`submodule`としてインストールします。

~~~shell
cd ${hugoのサイト}
git submodule add https://github.com/kantas-spike/kantas-theme.git themes/kantas
~~~

そして、`${hugoのサイト}/config.toml`に以下の行を追加してテーマを有効化してください。

~~~toml
theme = "kantas"
~~~~

また、本テーマは、`PostCSS`を利用します。
[PostCSS | Hugo](https://gohugo.io/hugo-pipes/postcss/)にあるように、サイト側に`postcss-cli`が必要になります。

さらに、[tailwindcss](https://tailwindcss.com/)を使用します。そのため、テーマ側に、`postcss`や`tailwindcss`などの各種パッケージのインストールが必要になります。

セットアップ手順に説明します。

### サイト側セットアップ

#### パッケージのインストール

`Hugo`のサイトのディレクトリで以下を実行します。

~~~shell
cd ${hugoのサイト}
npm install
~~~

#### セクションの作成

以下を実行し、セクションのインデックスページを作成してください。
適宜、インデックスページの本文を記載してください。

~~~shell
hugo new -k undraft blog/_index.md
hugo new -k undraft til/_index.md
hugo new -k undraft mytools/_index.md
hugo new -k undraft ihc/_index.md
~~~

#### データファイルの作成

[データファイル](#データファイル)に従い、以下のファイルを作成してください。

- data/socialmedia.json
- data/projects.json

### テーマ側セットアップ： パッケージのインストール

先程インストールした`themes/kantas`ディレクトリに移動して、以下を実行します。

~~~shell
cd ${hugoのサイト}/themes/kantas
npm install
~~~

## データファイル

本テーマは、2つのデータファイルを利用します。

|データファイルパス| 説明 |
|:---|:---|
|`${hugoのサイト}/data/socialmedia.json`| フッタに表示する連絡先を定義します。 |
|`${hugoのサイト}/data/projects.json`| `My Tools`および`IHC`のページに表示するプロジェクトの情報を表示します。 |

各データファイルの定義方法を説明します。

### socialmedia.json

フッタに表示する連絡先を定義したJSONファイルです。

~~~json
{
    "accounts":
    [
        {
            "name": "Twitter",
            "icon": "fa-twitter-square",
            "url": "https://twitter.com/実際のID"
        },
        {
            "name": "Youtube",
            "icon": "fa-youtube-square",
            "url": "https://www.youtube.com/channel/実際のID"
        },
        {
            "name": "GitHub",
            "icon": "fa-github-square",
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

### projects.json

`My Tools`および`IHC`のページに表示するプロジェクト(GitHubのリポジトリ)の情報を定義したJSONファイルです。

[データファイルの例](#データファイルの例)にあるようにファイル形式は、少し複雑です。

しかし、情報収集ツールである[kantas-spike/repo-info.py](https://github.com/kantas-spike/repo-info.py)により生成することを前提にしています。

ツールの設定ファイルに`name = "mytools"`と`name = "IHC"`の2つ分の[[repo-info.targets]]`を必ず定義してからツールを実行してください。

~~~toml
[[repo-info.targets]]
name = "mytools"
repos = ["repo1", "repo2", "repo3"]

[[repo-info.targets]]
name = "IHC"
repos = ["repo4"]
~~~

ツールの使い方、設定方法の詳細は、[kantas-spike/repo-info.py](https://github.com/kantas-spike/repo-info.py)を参照ください。


### データファイルの例

~~~json
{
    "mytools": [
        {
            "name": "slide2video.py",
            "full_name": "kantas-spike/slide2video.py",
            "html_url": "https://github.com/kantas-spike/slide2video.py",
            "description": "Blenderを利用して、スライド資料と、その資料用の音声データから動画編集ファイルを作成するツールです。",
            "size": 20,
            "pushed_at": "2022-07-11T21:09:05Z",
            "project_type": "mytools",
            "langs": [
                "Python",
                "Shell",
                "Makefile"
            ],
            "merged": []
        },
        // ..略..
    ],
    "IHC": [
        {
            "name": "Pong-Game-with-Pygame",
            "full_name": "kantas-spike/Pong-Game-with-Pygame",
            "html_url": "https://github.com/kantas-spike/Pong-Game-with-Pygame",
            "description": "A simple Pong game with Pygame",
            "size": 23,
            "pushed_at": "2022-07-05T18:45:27Z",
            "project_type": "IHC",
            "langs": [
                "Python"
            ],
            "merged": [
                {
                    "html_url": "https://github.com/kantas-spike/Pong-Game-with-Pygame/pull/17",
                    "title": "ドキュメント修正 フォント設定についての記述を追加",
                    "state": "closed",
                    "body": null,
                    "created_at": "2022-07-03T18:15:38Z",
                    "merged_at": "2022-07-03T18:15:51Z",
                    "closed_at": "2022-07-03T18:15:51Z",
                    "user": "kantas-spike"
                },
                // ..略..
            ]
        }
    ]
}
~~~