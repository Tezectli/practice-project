/* 用于教师关注率排行的组件 */
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
            <van-col span="18">
              <van-row>
                <svg class="color-icon" aria-hidden="true">
                  <use xlink:href="#zhsj-icon-jishu" />
                </svg>
                {{item.teacherName}}
              </van-row>
              <van-row  class="rank">排名：{{item.number}}</van-row>
            </van-col>
            <van-col span="6">
              <van-row class="mt-2" >
                <van-icon name="star" size="14px" />
                <span class="attentionRate">{{item.attentionRate}}</span>
              </van-row>
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
    name: "TeacherAttentionRate",
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
        // 监听父组件的传值,实时更新排行榜数据
        handler() {
          this.getTeacherAttentionRate()
        }
      }
    },
    created () {
      this.getTeacherAttentionRate()
    },
    methods: {
      async getTeacherAttentionRate () {
        try {
          //  从localStorage查询数据
          let cacheVal = storage.get('teacherAttentionRate');
          if (cacheVal && cacheVal.week === this.week) {
             this.list = storage.get('teacherAttentionRate').value;
          } else {
              let res = await this.$api.rankList.getTeacherAttentionRate(this.week);
              this.list = res.data.map(item => {
                return {
                  number: item.number,
                  teacherName: item.teacherName,
                  attentionRate: item.attentionRate
                }
              });
              let cacheVal = {
                list: this.list,
                week: this.week
              };
              // 将数据存入localStorage
              storage.set('teacherAttentionRate', cacheVal);
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
.attentionRate{
  font-size: 16px;
}
</style>
