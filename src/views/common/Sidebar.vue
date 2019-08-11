<template>
  <div class="side">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      :collapse="this.$store.state.collapse"
      router
    >
      <template v-for="item in muenList">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
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
              <el-menu-item :index="subItem.index" v-else :key="subItem.index">{{subItem.title}}</el-menu-item>
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
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>
<style scoped>
.side {
  display: block;
  position: absolute;
  width: 245px;
  left: 0;
  top: 70px;
  bottom: 0;
}
.side ul {
  height: 100%;
}
</style>
<style>
</style>

