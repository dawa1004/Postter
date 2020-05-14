<template>
  <li class="item">
    <div class="user-box">
      <div class="avatar" :style="'background-image: url('+currentUser.photoURL+')'"></div>
      <p class="user-name">{{currentUser.displayName}}</p>
    </div>
    <div class="editor">
      
      <textarea placeholder="投稿してみよう！" v-model="newWhisper" @keypress.enter="createWhisper">
        
      </textarea>
      <p class="message">Enterで投稿</p>
    </div>
  </li>
</template>

<script>
import { db } from '../main' // Firestoreデータベースをインポート

export default {
  props: ['currentUser'], //User.vueから渡されるログインユーザーのデータを受け取れる
  data () {
    return {
      newWhisper: '' // ユーザーがテキストエリアに記入した内容
    }
  },
  methods: {
    createWhisper () {
      const date = new Date()
      db.collection('whispers').add({
        'content': this.newWhisper, // テキストエリアに記入した内容
        'date': date, // 現在時刻
        'uid': this.$props.currentUser.uid // User.vueから渡されるcurrentUserのuid
      })
      .then(
        this.newWhisper = '' // 新規投稿後にテキストエリアを空欄に戻す
      )
    }
  }
}
</script>
