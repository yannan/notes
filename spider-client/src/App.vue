<template>
  <div id="app">
    <header class="my-header">
      <h1>
        <a href="#"> {{ msg }} </a>
      </h1>
      <tabCommon :tabs="mainTab" class="fr right-tab"></tabCommon>
    </header>
    <section class="content">
      <div class="clearfix">
        <tabCommon :tabs="otherTab" class="fl con-tab" @conTabChange="tabHandle"></tabCommon>
      </div>
      <resList :infos="infos"></resList>
    </section>
  </div>
</template>

<script>
import tabCommon from './component/tab-common.vue'
import resList from './component/res-list.vue'

import {resApi} from './api/api.js'

export default {
  name: 'app',
  data () {
    return {
      msg: 'DEMO',
      mainTab: [
        {'title': 'segmenfault'},
        {'title': '掘金'},
        {'title': 'W3C'}
      ],
      otherTab: [
        {'title': '最新', 'current': true},
        {'title': '最热', 'current': false}
      ],
      infos: ''
    }
  },
  components: {
    tabCommon,
    resList
  },
  methods: {
    init: function () {
      let param = `size=10&page=1`
      resApi(param).then((res) => {
        this.infos = res.info
        console.log('info:', this.infos)
      })
    },

    tabHandle: function (index) {
      this.otherTab = this.otherTab.map((item) => {
        item.current = false
        return item
      })
      this.otherTab[index].current = true
    }
  },

  mounted: function () {
    this.init()
  }
}
</script>

<style lang="scss">
  @import './static/scss/main.scss'
</style>
