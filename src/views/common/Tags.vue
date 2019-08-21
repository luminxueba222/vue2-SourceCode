<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li v-for="(item,index) in tagsList" :key="index" :class="{active:isActive(item.path)}">
        <span>
          <router-link :to="item.path">{{item.title}}</router-link>
          <i class="el-icon-close" @click="closeTag(item.path)"></i>
        </span>
      </li>
    </ul>
    <!-- {{this.$store.state.tagsList}} -->
    {{tagsList}}
    <div class="dropdownBox">
      <el-dropdown @command="handleCommand">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="Other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="All">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item,index) in tagsList"
        :key="index"
        :to="item.path"
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tagsList: []
    };
  },
  created() {
    this.setRoterList(this.$route);
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    Other() {
      console.log(this.$route.fullPath);
      this.tagsList = this.tagsList.filter(
        e => e.path === this.$route.fullPath
      );
    },
    closeTag(path) {
      // this.tagsList = this.tagsList.filter(e => e.path !== path);
      if (path == this.$route.fullPath) {
        if (this.tagsList.length > 1) {
          this.tagsList = this.tagsList.filter(e => e.path !== path);
          let frist = this.tagsList[0];
          this.$router.push(`${frist.path}`);
        } else {
          this.tagsList = [];
          this.$router.push(`/`);
        }
      } else {
        this.tagsList = this.tagsList.filter(e => e.path !== path);
      }
      console.log(this.tagsList);
      
       this.$store.commit('setTagsList',this.tagsList)
    },
    All() {
      this.$router.push("/");
      this.tagsList = [];
    },
    handleCommand(command) {
      command === "Other" ? this.Other() : this.All();
    },
    setRoterList(route) {
      let tagsListSome = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!tagsListSome) {
        if (this.tagsList.length >= 7) {
          this.tagsList.shift();
        }
        // console.log(route, 111);
  //  console.log(route,'route');
   
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.fullPath.slice(1)
        });
      }
      console.log(this.tagsList,"tagList");
      this.$store.commit('setTagsList',this.tagsList)
      // console.log(this,"this");
      
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newVal) {
      this.setRoterList(newVal);
    }
  }
};
</script>
<style scoped>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  overflow: hidden;
}
.tags ul {
  float: left;
}
.tags li {
  display: inline-block;
  margin-right: 5px;
  margin-top: 5px;
  border: 1px solid blueviolet;
  background: #888;
  padding: 2px;
}
.tags a {
  text-decoration: none;
  font-size: 12px;
}

.tags:not(.active):hover {
  background: #f8f8f8;
}
.tags .active {
  color: #fff;
  background: skyblue;
}
.tags .dropdownBox {
  float: right;
  width: 100px;
  height: 30px;
  background: skyblue;
}
</style>
