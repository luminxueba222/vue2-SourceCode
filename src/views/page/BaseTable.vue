<template>
  <div>
    <ul>
      <li v-for="(item,index) in list" :key="index">{{item.id}}</li>
    </ul>
    <!-- {{this.$store.state.tagsList}} -->
  </div>
</template>
<script>
export default {
  created(){
    this.axios.get('list').then(res=>{
      console.log('list',res);
      
       res.data.list.map(e=>{
          this.list.push(e)
      })
      
    })
  },
  data(){
    return{
      list:[]
    }
  }
};
</script>
<style scoped>
</style>