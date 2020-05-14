<template>
  <div class="home">
    <div class="list">

      <Item 
        v-for="whisper in orderBy(whispers,'date',-1)"
        :key="whisper.id"
        :id="whisper.id"
        :uid="whisper.uid" 
      />

    </div>
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import { db } from '../main' // Firestoreのデータベースをインポート
import Vue2Filters from 'vue2-filters' // プラグイン(vue2-filters)

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      whispers: [] // whispersという空の配列を、Firestoreから取得するwhisperデータの入れ物として用意
    }
  },
  firestore () {
    return {
      whispers: db.collection('whispers') //空の配列whispersにFirestore内にある「whispers」コレクション内のドキュメントを格納
    }
  },
  components: {
    Item
  },
  mixins: [Vue2Filters.mixin] // プラグイン(vue2-filters)
}
</script>