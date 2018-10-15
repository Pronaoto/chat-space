# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

##こちらは新規作成したリモートリポジトリになります。

##ディレクトリを二重に作成したことにより、デプロイ時のエラー解除のため、当リポジトリにファイルを移しました。

##元のリモートリポジトリのコミットに関しましては下記のリンクよりアクセスして頂くよう、宜しくお願い申し上げます。

###https://github.com/Pronaoto/ChatSpace/commits/master




## members table
|column|type|Options|
|------|----|-------|
|user_id|reference|null: false,foreign_key :ture|
|group_id|reference|null: false,foreign_key :ture|

### Association
- belongs_to :user
- belongs_to :group

## messages table
|column|type|Options|
|------|----|-------|
|body|text|-------|
|image|string|-------|

### Association
- belongs_to :user
- belongs_to :group

## users table
|column|type|Options|
|------|----|-------|
|name|string|null: false,unique: true|
|email|string|null: false|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## groups table
|column|type|Options|
|------|----|-------|
|name|string|null: false,unique: true|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages











