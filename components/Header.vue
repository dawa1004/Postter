<template>
  <header>
    <router-link to="/">
      <h1><span>Postter.</span></h1>
    </router-link>
    <div v-if="currentUser" class="btns">
      <!-- ヘッダーのユーザーアイコンをクリックした時サインイン中のユーザーのページにアクセス -->
      <router-link :to="'/user/'+currentUser.uid">
      <!-- ログインユーザーがいる場合の表示 -->
        <button :style="'background-image: url('+currentUser.photoURL+')'"></button>
      </router-link>
      <button>
        <fa icon="sign-out-alt" @click="signOut" />
      </button>
    </div>
    <!-- ログインユーザーがいない場合の表示 -->
    <div v-else class="btns">
      <button>
        <fa icon="user" @click="signIn" />
      </button>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase'
import { auth } from '../main' // mainからauthをインポートする
import { db } from '../main'
export default {
    data () {
      return {
        currentUser: {} // サインイン中のユーザーデータを格納する変数をdata() {}内に作成
      }
    },
    // 上の関数を追加し、ユーザーの状態が変わるごとにこの変数にユーザーデータを格納する
    created () {
      auth.onAuthStateChanged(user => {
        this.currentUser = user
      })
    },
    methods: {
    signIn () { // サインイン
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
      .then((result) => {
        this.$router.push('/user/'+result.user.uid) //自動的に該当ユーザーのページに移る
        alert('こんにちは、 '+result.user.displayName+'さん！')
        this.createUser(result.user)
      })
    },
    createUser (user) {
      db.collection('users').doc(user.uid).set({
        'name': user.displayName,
        'photoURL': user.photoURL,
        'email':user.email
      }, { merge: true })
    },
    signOut () { // サインアウト
      if (window.confirm('サインアウトしてもよろしいですか？')) {
        auth.signOut()
        .then(() => {
          alert('安全にサインアウトしました。')
          this.$router.push('/'),
          location.reload()
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
header
  position fixed
  top 0
  width 100%
  text-align center
  padding 10px
  h1
    width fit-content
    margin 0 auto
    font-size 1.4rem
    color slategray
  h1 span
     position: relative
     display: inline-block
     padding-bottom:0.5em
     border-bottom: 1px solid slategray
  h1 span::before,
  h1 span::after
      position: absolute
      top: 100%
      left:50%
      transform:translateX(-50%)
      content: ''
      border: 10px solid transparent
  h1 span::before
      border-top: 10px solid black
  h1 span::after
      margin-top: -1px
      border-top: 10px solid aliceblue
  .btns
    position absolute
    top 10px
    right 30px
    cursor pointer
    img
      width 100%
</style>