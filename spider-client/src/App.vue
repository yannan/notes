<template>
  <div id="app">
    <header class="my-header">
      <h1>
        <router-link to="/"> {{ msg }} </router-link>
      </h1>
      <div class="fr right-tab">
        <router-link to="/code/">二维码生成</router-link>
        <router-link to="/poetry/">每日一诗</router-link>
      </div>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import tabCommon from './component/tab-common.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'DEMO'
    }
  },
  components: {
    tabCommon
  },
  methods: {
    init: function () {

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
