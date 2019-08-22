<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="cardHeader">
            <div class="imgbox">
              <img src="../../assets/img/logo.png" alt />
            </div>
            <div class="user">
              <div>admin</div>
              <div class="role">超级管理员</div>
            </div>
          </div>
        </el-card>
        <div style="height:12px"></div>
        <el-card shadow="hover">
  <div slot="header" class="clearfix">
    <span>语言详情</span>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    vue:
    <el-progress :percentage="50"></el-progress>
  </div>
</el-card>
           <div id="EC" ></div>
      </el-col>
      <el-col :span="16">
        <div class="webInfo">
          <div class="info">
            <div class="iconBox">
              <i class="el-icon-user"></i>
            </div>
            <div>
              <div class="user">
                <div>admin</div>
                <div class="role">超级管理员</div>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="iconBox">
              <i class="el-icon-user"></i>
            </div>
            <div>
              <div class="user">
                <div>admin</div>
                <div class="role">超级管理员</div>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="iconBox">
              <i class="el-icon-user"></i>
            </div>
            <div>
              <div class="user">
                <div>admin</div>
                <div class="role">超级管理员</div>
              </div>
            </div>
          </div>
        </div>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div>
            <ul style="list-style:none">
              <li>
                <el-checkbox
                  v-model="item.status"
                  v-for="(item,index) in checkList"
                  :key="index"
                  style="display:block"
                >{{item.title}}</el-checkbox>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkList: [
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        }
      ]
    };
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
        var chart = this.echarts.init(document.getElementById('EC'));
        // console.log(chart,1111);
         var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chart.setOption(option);

    }
  }
};
</script>
<style scoped>
.cardHeader {
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 200px;
}
.imgbox {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #399;
  min-width: 100px;
}
.imgbox img {
  width: 100%;
  border-radius: 50%;
}
.user {
  margin: 15px 0 0 20px;
}

.user:nth-child(2) {
  font-size: 25px;
}
.role {
  font-size: 15px;
}
.webInfo {
  display: flex;
  flex-direction: row;
}
.info {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background: #fff;
  /* justify-content: space-between; */
  /* margin-right: 20px; */
}
.iconBox {
  padding: 30px;
  background: blue;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconBox i {
  font-size: 40px;
}
.webInfo .user {
  display: flex;
  /* padding: 20px; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin: 0 40px 0 0; */

  background: #fff;
}
.webInfo {
  /* background: #fff; */
  margin-bottom: 12px;
  display: flex;
}
#EC{
  /* width: 500px;
  height: 500px; */
}
</style>
