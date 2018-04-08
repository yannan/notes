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
        :page-size="size"
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
      total: 0,
      size: 10,
      page: 1,
      index: 0,
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
        this.infos = res.data
        this.total = res.total
        console.log(res)
      })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.loadData()
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.loadData()
    },

    tabHandle: function (index) {
      this.otherTab = this.otherTab.map((item) => {
        item.current = false
        return item
      })
      this.otherTab[index].current = true
      this.index = index

      this.loadData()
    },

    loadData: function () {
      if (this.index === 0) {
        let param = `size=${this.size}&page=${this.page}`
        resApi(param).then((res) => {
          this.infos = res.data
        })
      } else if (this.index === 1) {
        let param = `size=${this.size}&page=${this.page}`
        newsApi(param).then((res) => {
          this.infos = res.data
        })
      } else {
        let param = `size=${this.size}&page=${this.page}`
        blogApi(param).then((res) => {
          this.infos = res.data
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
