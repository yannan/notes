<template>
  <div id="app">
    <h1>短网址生成系统</h1>
    <div class="">
      <h2>请输入长网址:</h2>
      <input type="text" class="input-long" name="" value="" placeholder="请输入网址" v-model="longLink">
      <button type="button" name="button" class="btn" @click="getLink">提交</button>
    </div>

    <transition name="fade">
      <p v-if="show" class="tips">{{ tips }}</p>
    </transition>

    <div class="">
      <h2>对应短网址:</h2>
      <input type="text" class="input-short" :value="shortLink">
      <a :href="shortLink" target="_blank" class="a-link">打开链接</a>
    </div>
  </div>
</template>

<script>

import  {resApi} from './api/api'

export default {
  name: 'app',
  data () {
    return {
      longLink: '',
      shortLink: '',
      show: false,
      tips: ''
    }
  },

  methods: {
    getLink: function (event) {
      let reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/

      this.show = false
      if (!this.longLink) {
        this.show = true
        this.tips = '网址输入不能为空'
      } else if (!reg.test(this.longLink)) {
        this.show = true
        this.tips = '网址输入格式不正确'
      } else {
        resApi(this.longLink).then(res => {
          if (res.code === 200) {
            this.shortLink = res.shortLink
            this.show = true
            this.tips = '短链接生成成功'
          } else {
            this.show = true
            this.tips = res.msg
          }
        })
      }
    }
  },

  mounted: function () {

  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.input-long,
.input-short {
  width: 300px;
  padding: 0 15px;
  line-height: 36px;
  border: solid 1px #eee;
  font-size: 14px;
  color: #666;
  outline: 0;
}

.tips {
  color: red;
  font-size: 14px;
}

.btn {
  width: 100px;
  line-height: 36px;
  background: #2973b7;
  border-radius: 3px;
  border: 0;
  outline: 0;
  color: #fff;
  font-size: 14px;
}

.a-link {
  padding: 0 17px;
}
</style>
