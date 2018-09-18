<template>
  <div id="b-app">
    <b-header id="app-header" :setting="headerConfig" />
    <b-side-nav id="app-side-nav" :setting="sideConfig" />
    <b-body id="app-body" :setting="bodyConfig" />
    <b-footer id="app-footer" :setting="footerConfig" />
  </div>
</template>

<script>
import BFooter from "../../components/BFooter";
import BBody from "../../components/BBody";
import BHeader from "../../components/BHeader";
import BSideNav from "../../components/BSideNav";

export default {
  name: 'App',
  components: { BSideNav, BHeader, BBody, BFooter },
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
      const config = this.config.themeConfig
      return {
        'title': 'fuck'
      }
    },
    footerConfig () {
      const config = this.config.themeConfig
      return {
        'content': config.footer.description
      }
    },
    sideConfig () {
      const config = this.config.themeConfig
      return {
        'sideNav': config.sideBar
      }
    }
  },
  mounted () {
    console.log(this.$site)
  }
}
</script>

<style lang="stylus" scoped>
  #b-app
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
    height 100%
    width 100%

  body
    display flex
    min-height 100vh
    flex-direction column

  #app
    width 100%
    height 100%

  .container
    display block
    margin 0 auto
    padding 0 2rem
    width 80%
</style>
