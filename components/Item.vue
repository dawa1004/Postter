<template>
  <li class="item">
    <div class="user-box">

      <div class="avatar" :style="'background-image: url('+user.photoURL+')'">
      </div>

        <p class="user-name">{{user.name}}</p>
        
      </div>
      <!-- 編集用のテキストエリア editing = trueの時にのみ表示 -->
      <div v-if="editing" class="editor">
      <textarea v-model="whisper.content" placeholder="edit whisper" @keypress.enter="updateWhisper"> <!-- 編集されたテキストの内容がwhisper.contentに格納 -->
      </textarea>
      <p class="message">Enterで決定</p>
    </div>
    <!-- editingがfalseの時にはwhisperのテキストが表示 -->
    <div v-else class="content" v-html="whisper.content">
    </div>
    <!-- メニューボタンはサインイン中のユーザーが存在し、かつサインイン中のユーザーと投稿ユーザーのIDが等しい場合にのみ表示-->
    <button v-if="currentUser && currentUser.uid == user.id" @click="showBtns = !showBtns">
      <fa icon="ellipsis-v" />
    </button>
    <!-- 各ボタンは、メニューボタンをクリックした際に値が切り替わり、trueの時のみ表示 -->
    <div v-if="showBtns" class="controls">
      <li @click="editing = !editing">編集</li> <!-- クリックで編集 -->
      <li @click="deleteWhisper" style="color: red"> <!-- クリックで削除 -->
        削除
      </li>
    </div>
  </li>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'

export default {
  // Home.vueから取得したwhisperのIDをidというプロパティに格納 投稿ユーザーのIDをuidに格納
  props: ['id','uid'],
  data () {
    return {
      // 該当するwhisperドキュメントを格納するための空のオブジェクトwhisperを用意
      whisper: {},
      // 投稿ユーザーのドキュメントを格納するためのuserを用意
      user: {},
      currentUser: {}, // ユーザー情報を格納する空の変数
      showBtns: false, // showBtnsというboolean型の変数を用意
      editing: false // editingというboolean型の変数を用意
    }
  },
  created () { // サインイン中のユーザーデータをcurrentUserに入れる
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  firestore () {
    return {
      // idプロパティと等しいIDを持つwhisperドキュメントを変数whisperに格納
      whisper: db.collection('whispers').doc(this.$props.id),
      // uidプロパティと等しいIDを持つuserドキュメントを変数userに格納
      user: db.collection('users').doc(this.$props.uid)
    }
  },
  methods: {
    deleteWhisper () { // 削除用関数
      if (window.confirm('この投稿を削除してもよろしいですか？')) {
        db.collection('whispers').doc(this.$props.id).delete()
      }
    },
    updateWhisper () {
      const date = new Date()
      db.collection('whispers').doc(this.whisper.id).set({
        'content': this.whisper.content, // 更新されたテキストを'content'フィールドの値とする
        'date': date
      }, { merge: true })
      .then(
        this.editing = false // 更新後に変数editingの値をfalseに戻すことで更新後に自動でテキストエリアが非表示
      )
    }
  },
}
</script>

<style lang="stylus">
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
  .editor
    position relative
    width 100%
    textarea
      background transparent
      resize none
      height 80px
      width 96%
      border none
      padding 10px 2%
      font-size .9rem
      font-weight lighter
      &:focus
        outline none
    .message
      opacity 0  
      position absolute
      bottom 5px
      right 10px
      transition .2s
      font-size .8rem
    &:hover
      .message
        opacity 1
  .user-box
    margin 10px 10px 10px 0
    .avatar
      height 50px
      width 50px
      border-radius 50%
      border 1px solid #eee
      background-size cover
    .user-name
      margin 5px 0 0 0
      text-align center
      font-size .7rem
      line-height .7rem
      width 50px
  .content
    padding 10px
  button
    position absolute
    top 5px
    right 0
    background transparent
    color #555
    font-size .9rem
    opacity 0
    transition .2s
  .controls
    background white
    position absolute
    top 5px
    right 35px
    box-shadow 0 0 5px rgba(0,0,0,.05)
    border-radius 3px
    opacity 0
    li
      padding 5px 20px
      border-top 1px solid #eee
      cursor pointer
      &:first-child
        border none
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
    .content
    button
      opacity 1
    .controls
      opacity 1
</style>