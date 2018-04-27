<template lang="html">
  <div class="tab-common">
    <ul>
      <li v-for="(tab, index) in tabs" @click="tabChange(index)">
        <a href="#" :class="{ current: tab.current }"> {{ tab.title }} </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tablist',
  props: {
    tabs: ''
  },
  data () {
    return {

    }
  },
  methods: {
    tabChange: function (index) {
      console.log('click', index);

      this.$emit('conTabChange', index)
    }
  }
}
</script>

<style lang="scss">
.tab-common {

}
</style>
