<template>
  <div id="loginContainer">loginContainer</div>
</template>
<script>
export default {
    data () {
      return {
        data: {}
      }
   },
   mounted(){
    this.axios.get("/api/login").then(res=>{
      console.log(res,'resresresresresresresresresres');
    }).catch(err=>{
      console.log(err,'err')
    })
   }

}
</script>
<style scoped>
</style>
