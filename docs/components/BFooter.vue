<template>
  <footer :class="classes">
    <div class="container">
      <div class="content" v-html="content" />
      <div class="author">
        Theme by <strong>Himself65</strong>
      </div>
    </div>
  </footer>
</template>

<script>
import { defaultContentParser } from 'markdown-palettes'
export default {
  name: 'BFooter',
  components: { },
  props: {
    setting: { type: Object, required: true }
  },
  computed: {
    classes () {
      return {
        'b-footer': true
      }
    },
    content () {
      return defaultContentParser(this.setting.content)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../.vuepress/stylus/site.styl"

  footer
    display flex
    flex-direction column
    color rgba(255, 255, 255, .8)
    padding 2rem 0

  .b-footer
    background-color #333
    padding-bottom 56px
    min-height 7rem

    @media $display-breakpoints.xs-only
      margin-left 0
      width 100%

  .container
    display flex
    flex-direction column
    align-items center
    height 8rem

  .content
    flex 1 0 auto

  .author
    flex 0 0 auto
    font-size .8rem
</style>
