/* 用于学生主页的导航组件 */
<template>
  <div class="container">
    <van-row type="flex" justify="center">
      <van-col span="6">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/selectCourse')">
          <img src="@/assets/img/xuanke.png" class="img">
          <span class="font">在线选课</span>
        </div>
      </van-col>
      <van-col span="6">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/declare')">
          <img src="@/assets/img/shenbao.png" class="img">
          <span class="font">在线申报</span>
        </div>
      </van-col>
      <!-- </van-row> -->
      <van-col span="6">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/activity')">
          <img src="@/assets/img/huodong.png" class="img">
          <span class="font">活动报名</span>
        </div>
      </van-col>
      <van-col span="6">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/myCourse')">
          <img src="@/assets/img/kebiao.png" class="img">
          <span class="font" style="margin-left:-62px">课表与资源</span>
        </div>
      </van-col>
    </van-row>
    <!-- <van-row type="flex" justify="center">
      <van-col span="12">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/activity')">
          <img src="@/assets/img/活动报名.png" class="img">
          <span class="font">活动报名</span>
        </div>
      </van-col>
      <van-col span="12">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/myCourse')">
          <img src="@/assets/img/我的课程.png" class="img">
          <span class="font" style="margin-left:-120px">课表与资源</span>
        </div>
      </van-col>
    </van-row> -->
    <van-row type="flex" justify="center">
      <van-col span="6">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/notify')">
          <img src="@/assets/img/tongzhi.png" class="img">
          <span class="font">消息通知</span>
        </div>
      </van-col>
      <van-col span="6">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/myWorks')">
          <img src="@/assets/img/zuoping.png" class="img">
          <span class="font">我的作品</span>
        </div>
      </van-col>
      <van-col span="6">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/myorder')">
          <img src="@/assets/img/dingdan.png" class="img">
          <span class="font">我的订单</span>
        </div>
      </van-col>
      <van-col span="6">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/workWall')">
          <img src="@/assets/img/jingcai.png" class="img">
          <span class="font">精彩瞬间</span>
        </div>
      </van-col>
    </van-row>
    <!-- <van-row type="flex" justify="center">
      <van-col span="12">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/myorder')">
          <img src="@/assets/img/我的订单.png" class="img">
          <span class="font">我的订单</span>
        </div>
      </van-col>
      <van-col span="12">
        <div style="text-align:center;position:relative" @click="RouterTo('/s/workWall')">
          <img src="@/assets/img/作品墙.png" class="img">
          <span class="font">精彩瞬间</span>
        </div>
      </van-col>
    </van-row> -->
  </div>
</template>

<script>
import { Grid, GridItem, Row, Col, Image } from "vant";
import Vue from "vue";
Vue.use(Grid)
  .use(GridItem)
  .use(Row)
  .use(Col)
  .use(Image);
export default {
  name: "HomeGrid",
  methods: {
    RouterTo(url) {
      this.$router.push(url);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS tmo this component only -->
<style scoped>
.container {
  background-color: #fff;
  margin-top: 18px;
}
.grid-title {
  font-size: 85%;
  font-weight: 600;
  margin-top: 5px;
}
.img {
  /* width: 150px;
  height: 120px;
  border-radius: 10px; */
  width: 55px;
  height: 55px;
  border-radius: 7px;
  margin-bottom: 35px;
}
.font {
  /* position: absolute;
  z-index: 2;
  margin-left: -110px;
  margin-top: 50px;
  font-size: 20px;
  font-family: Microsoft JhengHei;
  font-weight: 550;
  color: white; */
  position: absolute;
  z-index: 2;
  margin-left: -13.73333vw;
  margin-top: 16.63333vw;
  font-size: 12px;
  font-family: Microsoft JhengHei;
  font-weight: 600;
  color: black;
}
</style>
