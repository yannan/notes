<template lang="html">
  <div class="poetry-container">
    <h3 class="title">{{ title }}</h3>
    <h4>{{ author }}</h4>
    <div class="poetry-con" v-html="content">

    </div>
  </div>
</template>

<script>
import {getPoetry} from '../api/api'
export default {
  data () {
    return {
      title: '',
      author: '',
      content: ''
    }
  },
  methods: {
    init: function () {
      getPoetry().then(res => {
        this.title = res[0].title;
        this.author = res[0].author;
        this.content = res[0].content.replace(/\n/g, '</br>');
      })
    }
  },
  mounted: function () {
    this.init()
  }
}
</script>

<style lang="scss">
  .poetry-container{
    padding-top: 50px;
  }
</style>
