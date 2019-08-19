<template>
  <div>
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>
<script>
export default {
  data(){
    return{
      orgOptions:{
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
           }]
        }
     }
    }
  }
</script>
<style scoped>
</style>