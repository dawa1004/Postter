<template>
  <div id="user">
    <div class="user-title">
      <div class="avatar" :style="'background-image: url('+user.photoURL+')'"></div>
      <div class="texts">
        <h1>{{user.name}}</h1>
        <!-- {{myWhispers.length}}でmyWhispersの数を取得し表示 -->
        <p v-if="myWhispers.length > 1">{{myWhispers.length}}件の投稿</p>
        <p v-else>{{myWhispers.length}}件の投稿</p>
      </div>
    </div>
    <!-- リストを追加し日付が新しい順にmyWhispersを並べて各IDをItemコンポーネントに渡す -->
    <div class="list">
      <Editor :currentUser="currentUser"/>
      <Item 
        v-for="whisper in orderBy(myWhispers,'date',-1)"
        :key="whisper.id" 
        :id="whisper.id"
        :uid="whisper.uid" 
      />
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'
import firebase from 'firebase'
import Vue2Filters from 'vue2-filters'
import Item from '@/components/Item'
import Editor from '@/components/Editor'

export default {
  components: {
    Item,
    Editor
  },
  data () {
    return {
      user: {},
      myWhispers: [],
      currentUser: {}
    }
  },
  firestore () {
    return {
      // ルート（URL）内のuidというパラメータを取得し、そのIDを持つドキュメントを、usersコレクションの中から取得、変数userに格納
      user: db.collection('users').doc(this.$route.params.uid),
      // myWhispersにthis.$route.params.uidというuidを持つドキュメントを格納
      myWhispers: db.collection('whispers').where('uid','==',this.$route.params.uid) 
    }
  },
  created () {
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus" scoped>
.user-title
  display flex
  flex-wrap nowrap
  justify-content flex-start
  margin 10px 0
  .avatar
    width 50px
    height 50px
    border-radius 5px
    background-size cover
  .texts
    margin-left 10px
    h1
      font-size 1.5rem
      margin 0
    p
      font-size .8rem
      margin 0
</style>