<template>
  <div class="side">
    <el-menu>
      <template v-for="item in muenList">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu :index="subItem.index" :key="subItem.index" v-if="subItem.subs">
                <template slot="title">{{subItem.title}}</template>
                <el-menu-item
                  :index="threeItem.index"
                  v-for="threeItem in subItem.subs"
                  :key="threeItem.index"
                >{{threeItem.title}}</el-menu-item>
              </el-submenu>
              <el-menu-item :index="subItem.index" v-else :key="subItem.index">选项1</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      muenList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("/data").then(res => {
        this.muenList = res.data.data;
        console.log(this.muenList);
      });
    }
  }
};
</script>
<style scoped>
</style>
