<template>
  <div class="b-side-nav">
    <div class="items-container">
      <router-link
        v-for="item in sideNavItems" :to="item.link" :key="item.text"
        class="item"
      >
        <span :class="item.icon" style="font-size: 18px;" class="item-icon fa" />
        <span class="item-text" style="font-size: .8rem">{{ item.text }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BSideNav',
  props: {
    setting: { type: Object, required: true }
  },
  computed: {
    sideNavItems () {
      return this.setting.sideNav
    }
  },
  mounted () {
    console.log(this.setting)
  }
}
</script>

<style lang="stylus" scoped>
  @import "../.vuepress/stylus/site.styl"

  #app-side-nav
    @media $display-breakpoints.sm-and-up
      margin-left 0
    @media $display-breakpoints.xs-only
      margin-left 0

  .b-side-nav {
    background-color: #34495e;
    top 0
    left 0
    position fixed
    width $app-side-nav-width
    min-height 100%
    .items-container {
      margin-top $app-header-height
      display flex
      flex-direction column
      align-items center
      text-align center
      .item {
        display flex
        flex-direction column
        justify-content center
        align-items center
        align-content center
        min-height 64px
        width 60px
        .item-icon, .item-text {
          color #ddd
          text-decoration none
        }
        .item-icon {
          background transparent
          width 48px
          height 2rem
          line-height 2rem
        }
        .item-text {
          display block
          font-size .8rem
          padding-left .1rem
          padding-right .1rem
        }
      }
    }
  }
</style>
