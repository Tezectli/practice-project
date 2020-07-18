/* 用于学生积分排行组件 */
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
              <van-row>
                <svg class="color-icon" aria-hidden="true">
                  <use xlink:href="#zhsj-icon-xuesheng" />
                </svg>
                <span>{{item.teacherName}}</span>
              </van-row>
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
  import { List, Row, Col, Cell, CellGroup, Icon } from 'vant';
  import storage from "../common/storage";
  import Vue from 'vue'
  Vue.use(List)
      .use(Row)
      .use(Col)
      .use(Cell)
      .use(CellGroup)
      .use(Icon);
  export default {
    name: "StudentIntegral",
    props: {
      week: {
        type: Number,
        require: true
      },
      classId: {
        type: String,
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
          if (this.week !== 0 && this.classId !== '') {
            this.getStudentIntegral()
          }
        }
      },
      classId: {
        handler() {
          if (this.week !== 0 && this.classId !== '') {
            this.getStudentIntegral()
          }
        }
      }
    },
    methods: {
      async getStudentIntegral () {
        try {
          let cacheVal = storage.get('studentIntegral');
          if (cacheVal && cacheVal.week === this.week
              && cacheVal.classId === this.classId
          ) {
            this.list = storage.get('studentIntegral').value;
          } else {
            let res = await this.$api.rankList.getStudentIntegral(this.classId, this.week);
            this.list = res.data.map(item => {
              return {
                number: item.number,
                teacherName: item.teacherName,
                totalIntegral: item.totalIntegral
              }
            });
            let cacheVal = {
              list: this.list,
              week: this.week,
              classId: this.classId
            };
            storage.set('studentIntegral', cacheVal);
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
  font-size: 9px;
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
