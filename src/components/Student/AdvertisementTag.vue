// 2020/4/1 邦 广告标签组件
<template>
  <div class="container">
    <div class="advertisement">
      <van-row type="flex" justify="center" style="margint-top:20px">
        <van-col span="18">
          <span style="margin-left:35%;font-weight:600">选择你感兴趣的标签吧</span>
        </van-col>
        <van-col span="6">
          <span @click="change" style="font-size:12px;margin-left:10px;font-weight:600">
            <van-icon name="replay" size="14" style="margin-left:10px" ref="icon" />换一换
          </span>
        </van-col>
      </van-row>
      <div class="title"></div>
      <div class="intro-animate">
        <transition-group
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
        >
          <div
            class="chat"
            v-for="(item,index) of animation"
            :key="item"
            :data-delay="index*250"
            :data-x="index%2 === 0 ? '-50%' : '50%'"
            :data-y="getRandom()+'%'"
            :data-s="0"
            @click="chooseItem(item,index)"
            ref="chooseItem"
          >{{item}}</div>
        </transition-group>
      </div>
    </div>
    <van-button class="footer" type="info" block @click="jumpToShow">选好了</van-button>
  </div>
</template>

<script>
import { Button, Icon, Col, Row, Toast } from "vant";
import Vue from "vue";
Vue.use(Button)
  .use(Icon)
  .use(Col)
  .use(Row);
export default {
  name: "AdvetisementTag",
  data() {
    return {
      chats: [
        [
          "动漫",
          "医学",
          "不为人知",
          "耽美",
          "二次元",
          "666",
          "777",
          "888",
          "999"
        ],
        ["换一换", "换一换", "我再换", "我换换换"]
      ],
      animation: [],
      animated: false,
      flag: 0,
      choose: [],
      isactive: -1,
      jump: false
    };
  },
  model: {
    prop: "mes",
    event: "change"
  },
  props: {
    mes: Number
  },
  mounted() {
    this.$nextTick(() => {
      this.animation.push(...this.chats[0]);
    });
  },
  methods: {
    beforeEnter(dom) {
      let { x = 0, y = 0, s = 1, opacity = 0 } = dom.dataset;
      dom.style.cssText = `transition: .3s;opacity: ${opacity};transform: scale(${s}) translateX(${x}) translateY(${y});`;
    },
    enter(dom, done) {
      let delay = dom.dataset.delay;
      setTimeout(function() {
        dom.style.cssText = `transition: .3s;opacity: 1;transform: scale(1) translateX(0) translateY(0);`;
        //监听 transitionend 事件
        var transitionend = window.ontransitionend
          ? "transitionend"
          : "webkitTransitionEnd";
        dom.addEventListener(transitionend, function onEnd() {
          dom.removeEventListener(transitionend, onEnd);
          done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        });
      }, delay);
    },
    afterEnter(dom) {
      dom.style.cssText = "";
    },
    getRandom() {
      const rate = Math.floor(Math.random() * 90 + 10);
      return Math.random() > 0.5 ? rate : -1 * rate;
    },
    change() {
      this.choose = [];
      this.flag++;
      let temp = this.flag % 2;
      this.animation = this.chats[temp];
      this.$refs.icon.classList.add("icon");
      setTimeout(() => {
        this.$refs.icon.classList.remove("icon");
      }, 1000);
    },
    chooseItem(name, index) {
      let color = window
        .getComputedStyle(this.$refs.chooseItem[index])
        .getPropertyValue("background-color");
      if (color === "rgb(68, 138, 255)") {
        this.$refs.chooseItem[index].style = "background-color:#69f0ae";
      } else {
        this.$refs.chooseItem[index].style = "background-color:#448aff";
      }
      if (this.choose.includes(name)) {
        let index = this.choose.indexOf(name);
        this.choose.splice(index, 1);
      } else {
        this.choose.push(name);
      }
    },
    jumpToShow() {
      if (this.choose.length == 0) {
        Toast.fail("您尚未选择兴趣标签");
      } else {
        this.$emit("change", 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@function getRight($w) {
  @if $w % 3 == 0 {
    @return 85;
  }
  @if $w == 5 {
    @return 30;
  }
  @return 130;
}
@function getLeft($w) {
  @if $w % 4 == 0 {
    @return 40;
  }
  @return 80;
}
.container {
  min-height: 100vh;
  background: white;
  .advertisement {
    height: 100%;
    position: relative;
    background: #fff;
  }
}
.title {
  position: absolute;
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.chat {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  padding: 10px;
  color: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(83, 110, 245, 0.2);
  border-radius: 50%;
  text-align: center;
  &:nth-child(odd) {
    background: #69f0ae;
  }
  &:nth-child(even) {
    background: #69f0ae;
  }
  @for $i from 1 through 10 {
    @if $i % 2 == 0 {
      &:nth-child(#{$i}) {
        top: calc(#{$i - 1} * 60px + 70px);
        left: #{getLeft($i)}px;
      }
    } @else {
      &:nth-child(#{$i}) {
        top: calc(#{$i - 1} * 60px + 70px);
        right: #{getRight($i)}px;
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  font-size: 18px;
  font-weight: bold;
}
.tag {
  position: absolute;
  height: 20px;
  width: 55px;
  border-radius: 10px;
  background-color: red;
  text-align: center;
  left: 5px;
  bottom: 5px;
}
@keyframes rotateIcon {
  0% {
    transform: rotate(60deg);
  }
  25% {
    transform: rotate(120deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(240deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.icon {
  animation: rotateIcon 0.5s;
}
</style>