import Vue from 'vue'
import App from './App.vue'
import router from './router'
// FontAwesomeここから
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faSignOutAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faSignOutAlt,
  faEllipsisV
)
// firebaseの初期化 dbという名前でアプリ内でFirestoreデータベースを使えるようにする。同様にauthという名前でユーザー管理のためのサービスを使えるようにする。
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(firestorePlugin)
// Firebaseウェブアプリの追加で取得したコードを読み込む
firebase.initializeApp({
  apiKey: "AIzaSyDjiiV2JlzK6DTxBJFG6kAu8L2cWKO6rQw",
  authDomain: "myvueappproject.firebaseapp.com",
  databaseURL: "https://myvueappproject.firebaseio.com",
  projectId: "myvueappproject",
  storageBucket: "myvueappproject.appspot.com",
  messagingSenderId: "761546592818",
  appId: "1:761546592818:web:0f4d27d0f20447de82222b",
  measurementId: "G-WRYX9JQCSM"
})

export const db = firebase.firestore()
export const auth = firebase.auth()

Vue.component('fa', FontAwesomeIcon)
// FontAwesomeここまで

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
