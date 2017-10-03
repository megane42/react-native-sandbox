import React, { Component }                          from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView                                       from 'react-native-maps';

// --------------------------------------------------------------------------------------------------

export default class Main extends Component {

  constructor(props) {
    super(props);

    // * setState() される前に render() で state を参照されるとエラーになってしまうので、
    //   コンストラクターで state の初期化を行う必要がある。
    this.state = {
        snapshotBlob: '',
    };
  }

  componentDidMount = () => {

    // * 現在地取得は、ブラウザと同じく navigator.geolocation なるグローバル変数を使って取得できる。
    // * getCurrentPosition() を実行すると、ユーザーに位置情報の使用許可を求める
    //     * TODO: 本当は許可されなかった時のエラー処理関数も書かないとダメ。
    // * info.plist に `NSLocationWhenInUseUsageDescription` なるキーが必要だが、デフォルトで書かれている。
    // * 現在地を取得する処理は非同期処理なので componentDidMount に書く。
    //     * see: https://qiita.com/megane42/items/213e927a2af72530e920
    navigator.geolocation.getCurrentPosition((location) => {

      // * 初めは取得した現在地を setState して地図を再 render させるような実装にしていたが、
      //   描画する座標を state として持ってしまうと、何かのきっかけで再 render が行われるたびに
      //   最初に取得した現在地に戻ってきてしまうので、初回マウント時に一度だけ飛ばすようにした。
      //     * state が増えると状態管理が大変なので、少なくできるなら少ないほうがいい。
      // * API : https://github.com/airbnb/react-native-maps/blob/master/docs/mapview.md
      //     * Type とは、ActiveRecord のバリデーションみたいなもの。
      this.map.animateToRegion({
        latitude  : location.coords.latitude,
        longitude : location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        }, 1000);
    });
  }

  // * アロー演算子でメソッドを定義しないと、メソッド内の this が Main コンポーネントにならない。
  //     * その目的でアロー演算子を使ってることが伝わりづらいから、汚くても bind() で書いたほうがいいかも？
  takeSnapshot = () => {
    const snapshot = this.map.takeSnapshot({
      width   : 200,
      height  : 200,
      format  : 'png',
      result  : 'base64'
    });

    // * takeSnapshot は promise オブジェクト (a.k.a. thenable オブジェクト) を返す。
    //     * see: https://qiita.com/progre/items/03626b7f4655007d8cb2
    snapshot.then((blob) => {
      this.setState({ snapshotBlob: 'data:image/png;base64,' + blob });
    });
  }

  render = () => {
    return (
      <View style={styles.container}>

        // * takeSnapshot() とか animateToRegion() は MapView から生えているので、コードから実行するにはマウントした <MapView /> への参照 (= ref) が必要。
        //     * 最もシンプルなのは、<MapView ref='hoge' ... /> みたいに書いておいて、コードから this.refs.hoge.takeSnapshot() のように参照するパターン。
        //         * よくわからないがこれだと実現できないものがあるので、後述のスタイルが推奨らしい
        //             * https://www.wantedly.com/companies/wantedly/post_articles/32166
        //     * ref にコールバック関数を指定すると、引数にそのコンポーネント自体を取りながら、マウント時に実行してくれるらしい
        //         * 以後、コードでは this.map からこのコンポーネントにアクセスできる
        //         * こういうイディオムだと思っちゃってよさそう
        //         * https://reactjs.org/docs/refs-and-the-dom
        <MapView ref={map => { this.map = map }} style={styles.map} />

        <TouchableOpacity onPress={this.takeSnapshot} style={styles.snapshot}>
          <Image source={{uri: this.state.snapshotBlob}} style={styles.image}/>
        </TouchableOpacity>
      </View>
    );
  }
}

// * 画面の上半分を地図、下半分をスナップショット画像（兼ボタン）にする。flex のおかげで簡単に書ける。
const styles = StyleSheet.create({
  container : { flex: 2 },
  map       : { flex: 1 },
  snapshot  : { flex: 1 },
  image     : { flex: 1 },
});
