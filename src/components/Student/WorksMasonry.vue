// 学生端瀑布流的展示组件 -润 2019/12/2
// 改为list异步更新 -邦 2020/3/23
<template>
  <div style="display:block">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多作品了" offset="0">
      <div class="masonry">
        <div class="column">
          <!-- more items-->
          <work-card v-for="(work,index) of data[0]" :key="index" :work="work"></work-card>
        </div>
        <!-- 第二列 -->
        <div class="column">
          <!-- more items-->
          <work-card v-for="(work,index) of data[1]" :key="index" :work="work"></work-card>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import WorkCard from "@/components/Student/WorkCard";
import Vue from "vue";
import { List, Toast } from "vant";

Vue.use(List);
const postTypeMap = {
  form_post_application: "作品应用",
  form_post_works: "作品",
  form_post_other: "其它"
};
export default {
  name: "WorkMasonry",
  components: {
    "work-card": WorkCard
  },
  props: {
    classId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      data: [[], []],
      leftData: [],
      rightData: [],
      legth: 0,
      loading: true,
      finished: false
    };
  },
  methods: {
    //  获取对应班级的作品列表
    async getWorksByClass() {
      this.data = [[], []];
      this.leftData = [];
      this.rightData = [];
      try {
        this.length = 0;
        let res = await this.$api.works.getWorksByClass(this.classId);
        res = res.data.map(work => {
          const postType = postTypeMap[work.postType];
          work.workType = typeof postType == "undefined" ? "其它" : postType;
          return work;
        });
        setTimeout(() => {
          this.loading = false;
          this.finished = true;
        }, 1000);
        for (let i = 0; i < res.length; i++) {
          i % 2 === 0 ? this.data[0].push(res[i]) : this.data[1].push(res[i]);
        }
        // for (let i = 0; i < 3; i++) {
        //     this.leftData.push(this.data[0][this.length]);
        //     this.rightData.push(this.data[1][this.length]);
        //   this.length++;
        // }
        if (res.length == 0) {
          this.finished = true;
          Toast("该班级暂无作品");
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    },
    onLoad() {
      setTimeout(() => {
        this.leftData.push(this.data[0][this.length]);
        this.rightData.push(this.data[1][this.length]);
        this.length++;
      }, 1500);
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (
        this.length >= this.data[0].length - 1 &&
        this.length >= this.data[1].length - 1
      ) {
        this.finished = true;
      }
    }
  },
  watch: {
    classId: function() {
      this.finished = false;
      this.loading = true;
      this.getWorksByClass();
    }
  }
};
</script>
<style lang="scss" scoped>
.masonry {
  display: flex; // 设置为Flex容器
  flex-direction: row; // 主轴方向设置为水平方向
  // background: rgb(235, 235, 235);
}
.column {
  width: 50%;
  display: flex; // 设置为Flex容器
  flex-direction: column; // 主轴方向设置为垂直方向
  align-items: center;
  margin: 10px;
}
.column:first-child {
  margin-right: 10px;
}
</style>