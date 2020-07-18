/* 用于教师积分排行组件 */
<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell-group>
        <van-cell v-for="item in list" :key="item.number">
          <van-row>
            <van-col span="21">
              <van-rurow>
                <svg class="color-icon" aria-hidden="true">
                  <use xlink:href="#zhsj-icon-jishu" />
                </svg>
                {{item.teacherName}}
              </van-rurow>
              <van-row  class="rank">排名：{{item.number}}</van-row>
            </van-col>
            <van-col span="3" class="mt-2">
              <van-icon name="star" size="14px" />
              <span class="integral">{{item.totalIntegral}}</span>
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
  import { List, Col, Cell, CellGroup } from 'vant';
  import Vue from 'vue'
  import storage from "../common/storage";
  Vue.use(List)
    .use(Col)
    .use(Cell)
    .use(CellGroup);
  export default {
    name: "TeacherIntegral",
    props: {
      week: {
        value: 0,
        type: Number,
        require: true
      }
    },
    data () {
      return {
        list: [],
        loading: false,
        finished: false
      }
    },
    watch: {
      week: {
        handler() {
          this.getTeacherIntegral()
        }
      }
    },
    created() {
      this.getTeacherIntegral()
    },
    methods:{
      async getTeacherIntegral () {
        try {
          let cacheVal = storage.get('teacherIntegral');
          if (cacheVal && cacheVal.week === this.week) {
            this.list = storage.get('teacherIntegral').value
          } else {
            let res = await this.$api.rankList.getTeacherIntegral(this.week);
            this.list = res.data.map(item => {
              return {
                number: item.number,
                teacherName: item.teacherName,
                totalIntegral: item.totalIntegral
              }
            });
            let cacheVal = {
              list: this.list,
              week: this.week
            };
            storage.set('teacherIntegral', cacheVal);
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
        } catch (e) {
          // eslint-disable-next-line
          console.log("​catch -> e", e);
        }
      }
    }
  }
</script>

<style scoped>
.color-icon {
  font-size: 10px;
}
.mt-2 {
  margin-top: 15px;
}
.rank {
  color: #777777;
}
.integral{
  font-size: 16px;
}
</style>
