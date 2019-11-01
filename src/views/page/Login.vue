<template>
  <div id="mountNode"></div>
</template>
<script>
export default {
  data () {
    return {
      data: {
        nodes: [{
          id: 'node1',
          x: 100,
          y: 200
        }, {
          id: 'node2',
          x: 300,
          y: 200
        }],
        edges: [{
          source: 'node1',
          target: 'node2'
        }]
      }

    }
  }
}
</script>
<style scoped>
</style>
