<template>
  <div id="ec" style="width: 600px;height:400px;">Tabs1</div>
</template>
<script>
export default {
  data () {
    return {
      option:{
       xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
}

    }
  },
  mounted(){
    let ec = this.echarts.init(document.getElementById("ec"))
    console.log(ec,222);
    ec.setOption(this.option)
  }
  
  
  



};
</script>
<style scoped>
</style>