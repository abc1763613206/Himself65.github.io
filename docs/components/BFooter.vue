<template>
  <footer :class="classes">
    <div class="container">
      Code by Himself65
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BFooter',
  computed: {
    classes () {
      return {
        'b-footer': true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .b-footer
    min-height 7rem
    background-color #333
    color: rgba(255, 255, 255, .8)
</style>
