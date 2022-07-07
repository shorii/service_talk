# Cypress起動

## 事前準備

必要なコンテナを動かしておく。

```sh
$ cd /path/to/service_talk/development
$ docker-compose up -d
```

APIサーバ起動

```sh
$ cd /path/to/service_talk/api
$ cargo run -- --bind 0.0.0.0:8080
```

UIサーバ起動

```sh
$ cd /path/to/service_talk/ui
$ yarn dev
```

ホストでXLaunchを起動。
disable access controlを有効にする。

以下を実行。

```sh
$ export DISPLAY={ホストのIPアドレス}:0.0
$ xeyes # 任意。疎通の確認
$ sudo /etc/init.d/dbus start
$ yarn cypress open
```