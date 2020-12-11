# Online Pal 国際交流SNSアプリ
[https://online-pal1208.netlify.app/setting/account](https://online-pal1208.netlify.app/setting/account)



```
テストユーザーアカウント

メールアドレス：test2@test2.com
パスワード：12341234
```

※ページ内には「Guest Login （テストユーザーとしてワンクリックでログインができる機能）」も実装してあります。

## 開発目的
![Uploading スクリーンショット 2020-12-09 22.21.32.png…](https://github.com/Shunya1208/online-pal-client/blob/master/src/assets/images/locations/china.jpg)

海外に出張や旅行をした際に、もっと「語学を勉強しておけばよかった」や「食事や観光が一緒にできる友達がいれば」と思うことがしばしばありました。
そのような思いから、語学力を上げたい方や外国の友達が欲しい方に気軽に使ってもらえるように開発しました。

## 主な使い方
### ゲストログインまたはユーザー登録
　画面中央の「Guest Login 」で簡単ログインを行うか、画面右上の「Sign Up 」ユーザー登録を行ってください。
　既にアカウントをお持ちの方は、画面右上の「Log In」から登録を行ったユーザーでログイン可能です。

### 友達検索
　トップページの「QUICK SEARCH FRIENDS」または「SEARCH FRIENDS BY LOCATION」、「SEARCH FRINEDS BY LANGUAGE」の項目から、それぞれ年齢別・性別、国別、言語別の友達検索が可能です。

　「QUICK SEARCH FRIENDS」の項目では、トップページ上で素早く友達候補が検索出来ます。より多くの検索結果の参照する場合は「View　More」をクリックしてください。

　３つの項目を組み合わせて詳細検索をしたい場合は「SEARCH　FORM」から検索が可能です。

### リアルタイムメッセージ
　友達のプロフィールページにある「Message」ボタンを押すことでチャットルームが作成され、マイページ上でメッセージを送ることが出来ます。

### お気に入り登録
　友達のプロフィールページにある「Bookmark」ボタンを押すことでお気に入り登録が出来ます。

### マイページ
　ユーザー情報の変更やメッセージ、お気に入り登録の確認などが可能です。

## 主な機能
* ユーザー登録（メール認証）＆ログイン
* 簡単ログイン
* プロフィール画像アップロード＆プロフィール情報の変更
* お気に入り登録
* 検索機能
* リアルタイムメッセージ
* MapBoxによるユーザーの位置情報表示
* パスワード変更＆リセット
* アカウント削除

## 導入技術
* フロントエンド　HTML・CSS・JavaScript・React/Redux
* バックエンド　Node.js・Express
* データベース　MongoDB・Mongoose
* インフラ　Heroku・Netlify
