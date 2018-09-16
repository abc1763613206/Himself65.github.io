<template>
  <div />
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
  .b-body {

  }
</style>
