<template lang="html">
  <div class="list-common">
    <ul>
      <li v-for="info in infos">
        <a v-bind:href="info.link">
          <span> {{ info.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'reslist',
  props: {
    infos: ''
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
