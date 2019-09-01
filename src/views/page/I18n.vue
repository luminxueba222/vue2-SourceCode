<template>
  <div>L18n

  <!-- <titleH :data="obj"></titleH> -->
  <titleH :render="render" :data="obj"></titleH>
  </div>
</template>
<script>
import titleH from '../componentFunc/titleType.vue'
export default {
  components:{
     titleH,
  },
  data(){
    return{
      obj:{
         name:"xia",
         age:"18",
         sex:"男",
      }
    }
  },
  methods:{
   render(h,data){
     debugger
       return <span>{{data}}</span>
   }
  },
  created(){
    // console.log(this.axios,'axios');
    // this.axios.post('/open/api/weather/json.shtml',{
    //   city:'长沙'
    // }).then(res=>{
    //   console.log(res);
      
    // })
    
  },

  
};

</script>
<style scoped>
</style>