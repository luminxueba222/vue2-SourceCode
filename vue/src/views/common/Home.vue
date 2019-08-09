<template>
    <div>
        <x-header></x-header>
        <x-sidebar></x-sidebar>
        <x-mian>
            <div class="content-box" >
                <x-tags></x-tags>
                <div class="content">
                    <transition name="move" mode="out-in">
                        <keep-alive >
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </div>
        </x-mian> 
        
         
    </div>
</template>
<script>
import xMian from './Mian'
import xHeader from './Header'
import xSidebar from './Sidebar'
import xTags from './Tags'
export default {
    components: {
       xMian, 
       xHeader,
       xTags,
       xSidebar
    }
}
</script>
<style >
*{
    margin: 0px;
    padding: 0px
}
</style>
