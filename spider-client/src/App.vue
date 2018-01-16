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
    <div class="block clearfix pager">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="fr">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tabCommon from './component/tab-common.vue'
import resList from './component/res-list.vue'

import {resApi, newsApi, blogApi} from './api/api.js'

export default {
  name: 'app',
  data () {
    return {
      msg: 'DEMO',
      currentPage: 1,
      total: 100,
      size: 10,
      page: 1,
      mainTab: [
        {'title': 'segmenfault'},
        {'title': '掘金'},
        {'title': 'W3C'}
      ],
      otherTab: [
        {'title': '最新', 'current': true},
        {'title': '最热', 'current': false},
        {'title': '博客', 'current': false}
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
      })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },

    tabHandle: function (index) {
      this.otherTab = this.otherTab.map((item) => {
        item.current = false
        return item
      })
      this.otherTab[index].current = true

      if (index === 0) {
        let param = `size=10&page=1`
        resApi(param).then((res) => {
          this.infos = res.info
        })
      } else if (index === 1) {
        let param = `size=10&page=1`
        newsApi(param).then((res) => {
          this.infos = res.news
        })
      } else {
        let param = `size=10&page=1`
        blogApi(param).then((res) => {
          this.infos = res.blog
        })
      }
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
