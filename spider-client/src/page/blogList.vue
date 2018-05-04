<template lang="html">
  <div class="">
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
        :current-page="page"
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
import tabCommon from '../component/tab-common.vue'
import resList from '../component/res-list.vue'

import {resApi, newsApi, blogApi, jjApi} from '../api/api.js'

export default {
  data () {
    return {
      msg: 'DEMO',
      total: 0,
      size: 10,
      page: 1,
      index: 0,
      otherTab: [
        {'title': '最新', 'current': true},
        {'title': '最热', 'current': false},
        {'title': '掘金', 'current': false}
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
      // console.log(`每页 ${val} 条`)
      this.size = val
      this.loadData()
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.loadData()
    },

    tabHandle: function (index) {
      if (index === this.index) return
      this.otherTab = this.otherTab.map((item) => {
        item.current = false
        return item
      })
      this.otherTab[index].current = true
      this.index = index
      this.page = 1

      this.loadData()
    },

    loadData: function () {
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      let param = `size=${this.size}&page=${this.page}`
      if (this.index === 0) {
        resApi(param).then((res) => {
          this.infos = res.data
          this.total = res.total
          loading.close();
        })
      } else if (this.index === 1) {
        newsApi(param).then((res) => {
          this.infos = res.data
          this.total = res.total
          loading.close();
        })
      } else {
        jjApi(param).then((res) => {
          this.infos = res.data
          this.total = res.total
          loading.close();
        })
      }
    }
  },

  mounted: function () {
    this.init()
  }
}
</script>
