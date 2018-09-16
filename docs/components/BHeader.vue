<template>
  <div />
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

<style scoped>

</style>
