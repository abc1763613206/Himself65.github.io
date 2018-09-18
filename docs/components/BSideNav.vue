<template>
  <div class="b-side-nav">
    <div class="items-container">
      <router-link v-for="item in sideNavItems" :to="item.link" :key="item.text">
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
    position fixed
    width $app-side-nav-width
    min-height 100%
    .items-container {
      display flex
      flex-direction column
      align-items center
      text-align center
      min-height 48px
      .item-icon, .item-text {
        color #ddd
        text-decoration none
      }
      .item-icon {
        background transparent
        width 48px
        height 40px
      }
      .item-text {
        display block
        font-size 12px
        padding-left .1rem
        padding-right .1rem
      }
    }
  }
</style>
