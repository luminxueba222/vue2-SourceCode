<template>
  <div>
     {{tagsListArr}}{{this.$store.state.tagsList.length}}
    <x-header></x-header>
    <x-sidebar></x-sidebar>
    <div class="content-box" :class="{collapse:this.$store.state.collapse}">
      <x-tags></x-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsListArr">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import xHeader from "./Header";
import xSidebar from "./Sidebar";
import xTags from "./Tags";
export default {
  components: {
    xHeader,
    xSidebar,
    xTags
  },
  data() {
    return {
      // collapse:
      tagsListArr:[]
    };
  },
  created(){
    this.tagsListArr =this.$store.state.tagsList.map(e=>e.name)
  },
  computed:{
     tagsList(){
      return  this.$store.state.tagsList
    }
  },
  watch:{
    tagsList:function(old,newVlu){
       newVlu.forEach(e=>{
         if(!this.tagsListArr.includes(e.name)){
            this.tagsListArr.push(e.name)
         }
        
       })
    this.tagsListArr = JSON.parse(JSON.stringify(this.tagsListArr))  
    }
  }
};
</script>
<style >
* {
  margin: 0px;
  padding: 0px;
}

.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
  /* height: 100%; */
}
.collapse {
  left: 49px;
}
.content {
  width: auto;
  height: 100%;
  padding: 10px;
  /* overflow-y: scroll; */
  box-sizing: border-box;
}
</style>
