<template>
  <div class="loginContainer"
       v-if="isShow">
    <div>
      用户名：<input type="text"
             v-model="userValue">
      <div class="passContainer">
        密码：<input type="password"
               v-model="passValue">
      </div>
      <div class="loginBtn">
        <button @click="loginIn">登录</button>
      </div>
    </div>
    <!-- {{passValue}} -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      userValue: '123',
      passValue: 'xia',
      isShow: false,
    }
  },
  created () {
    this.isShow = true
  },
  methods: {
    loginIn () {
      if (this.userValue === "123" && this.passValue === 'xia') {
        this.$router.push({
          path: '/'
        })
      } else {
        alert("请输入正确的密码和用户名")
      }
    }
  },
  destroyed () {
    this.isShow = false
  }
}
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
.passContainer {
  margin-top: 10px;
}
.loginContainer {
  background-image: url("../../assets/img/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
}
.loginContainer input {
  height: 24px;
  line-height: 24px;
  font-size: 16px;
}
.loginBtn {
  text-align: center;
  padding: 10px 0 0 55px;
}
.loginBtn button {
  background: skyblue;
  color: #fff;
  border: 1px solid skyblue;
  width: 60px;
  height: 25px;
  border-radius: 3px;
}
</style>
