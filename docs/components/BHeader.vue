<template>
  <div class="b-header">
    <div class="title" />
    <div class="user-board" />
  </div>
</template>

<script>
export default {
  name: 'BHeader',
  props: {
    setting: { type: Object, required: true }
  },
  computed: {
    title () {
      return this.settings.title
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../.vuepress/stylus/site.styl"

  #app-header
    @media $display-breakpoints.sm-and-up
      margin-left $app-side-nav-width
    @media $display-breakpoints.xs-only
      margin-left 0
    height $app-header-height
    max-height $app-header-height
    background: hsla(0, 0%, 100%, .5)
</style>
