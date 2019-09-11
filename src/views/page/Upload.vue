<template>
  <div>upload</div>
</template>
<script>
export default {
  created(){
    this.getData()
  },
  methods:{
    getData(){
       this.axios.get("/api/user").then(res => {
        console.log(res,'res2222222222222222222222222222222222222');
      });
    }
  }
};
</script>
<style scoped>
</style>