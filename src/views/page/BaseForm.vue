<template>
  <div>
    <ul>
      <li v-for="(item,index) in list" :key="index">{{item.id}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  created(){
    this.axios.get('list').then(res=>{
      
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