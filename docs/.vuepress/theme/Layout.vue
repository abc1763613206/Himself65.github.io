<template>
  <div class="#app">
    <b-header :setting="headerConfig" />
    <b-body :setting="bodyConfig" />
    <b-footer :setting="footerConfig" />
  </div>
</template>

<script>
import BFooter from "../../components/BFooter";
import BBody from "../../components/BBody";
import BHeader from "../../components/BHeader";

export default {
  name: 'App',
  components: { BHeader, BBody, BFooter },
  computed: {
    config () {
      return this.$site
    },
    headerConfig () {
      const config = this.config.themeConfig
      return {
        'navItem': config.nav,
        'title': config.title,
        'description': config.description
      }
    },
    bodyConfig () {
      const config = this.config
      return {
        'sideNav': config.sideBar
      }
    },
    footerConfig () {
      const config = this.config.themeConfig
      return {
        'content': config.footer.description
      }
    }
  },
  mounted () {
    console.log(this.$site)
  }
}
</script>

<style lang="stylus" scoped>
  #app
    width 100%
    height 100%
</style>

<style lang="stylus">
  *
    margin 0
    padding 0

  html, body
    font-family -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue",
    "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans", "PingFang SC",
    "Microsoft YaHei", sans-serif
    background-color: #efefef

  body
    display flex
    min-height 100vh
    flex-direction column

  .container
    display block
    margin 0 auto
    padding 0 2rem
    width 80%
</style>
