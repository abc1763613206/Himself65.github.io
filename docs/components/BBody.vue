<template>
  <div>
    <Content />
  </div>
</template>

<script>
export default {
  name: 'BBody',
  props: {
    setting: { type: Object, required: true }
  },
  computed: {
    classes () {
      return {
        'b-body': true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../.vuepress/stylus/site.styl"

  #app-body
    @media $display-breakpoints.sm-and-up
      margin-left $app-side-nav-width
    @media $display-breakpoints.xs-only
      margin-left 0
      background-color #efefef
</style>
