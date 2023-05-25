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
npm init -f
npm install postcss-cli
~~~

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
- data/projects.json

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
