<template>
    <div>
        <template v-for="(item,index) in data"> 
              <li :key="index" v-if="!render">{{item}}</li>
              <itemType v-else :key="index+1" :render="render" :item="item"></itemType>
        </template>
 </div>
</template>
<script>
import itemType from './titleType'
export default {
    components:{
        itemType
    },
    props:{
        data:{
            type:Object,
            default:()=>{}
        },
         render:{
            type:Function,
        }
    }
}
</script>
<style scoped>
</style>
