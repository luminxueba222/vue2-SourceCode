<template>
  <div class="header">
    <div class="l">
      <div>
        <img src="../../assets/img/logo.png" alt />
      </div>
      <div>
        <span>后台管理系统</span>
      </div>
      <div class="iconMenu" @click="changeWidth">
        <i class="el-icon-menu"></i>
      </div>
    </div>
    <div class="r">
      <div>
        <span>name</span>|
      </div>
      <div>
        <img src="../../assets/img/logo.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    changeWidth() {
      alert(1);
    }
  }
};
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  height: 65px;
}
.l {
  width: 300px;
  background: #409eff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.r {
  width: 100%;
  background: rgb(179, 216, 255);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
}

.l img {
  height: 55px;
  width: 55px;
}
.l span {
  color: #fff;
  /* line-height: 55px;
  height: 55px; */
  display: inline-block;
  height: 20px;
  line-height: 20px;
}
.r img {
  height: 55px;
  width: 55px;
}
.iconMenu {
  width: 25px;
  height: 25px;
  font-size: 26px;
  line-height: 26px;
}
.iconMenu i {
}
</style>
