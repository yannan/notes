<template lang="html">
  <div class="table-common">
    <ul>
      <li v-for="info in infos">
        {{ info.info }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tablist',
  data () {
    return {
      infos: [
        {'info':1},
        {'info':2},
        {'info':3},
        {'info':4}
      ]
    }
  }
}
</script>

<style lang="scss">
.table-common {

}
</style>
