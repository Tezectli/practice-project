/* 班级学生列表组件，每三个一列，支持多选，查询。 -润
To use: v-model="students(一个只包含学生id的数组，这个组件会动态返回选中的学生)" :classId="classId(对应的班级id)" 
 */
<template>
  <div>
    <form action="/" style="margin-bottom:10px;">
      <van-search placeholder="学生姓名" v-model="srhName"  @search="onSearch()" />
    </form>
    <van-checkbox-group v-model="val" @change="$emit('update',val)">
      <van-cell-group>
        <van-row>
          <van-col span="13">
            <div class="btn-wrapper">
              <div>
                <van-button plain hairline type="primary" color="#78909c" size="small" round @click="pickAll()">全选</van-button>
              </div>
              <div>
                <van-button plain hairline size="small" round @click="pickOppsite()">反选</van-button>
              </div>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8" v-for="(item, index) in list" :key="index">
            <van-cell clickable @click="toggle(index)">
              <template slot="title">
                <van-tag type="success" color="#78909c" plain >{{item.seatNumber}}</van-tag>&nbsp;
                <span class="title">{{item.name}}</span>
              </template>
              <van-checkbox
                :name="item.id"
                ref="checkboxes"
                slot="right-icon"
                checked-color="#78909c"
              />
            </van-cell>
          </van-col>
        </van-row>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>
<script>
import {
  Row,
  Col,
  Cell,
  CellGroup,
  Search,
  Checkbox,
  CheckboxGroup,
  Tag,
  Button,
  Toast,
  
} from "vant";
import Vue from "vue";
Vue.use(Row)
  .use(Col)
  .use(Search)
  .use(Cell)
  .use(CellGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Tag)
  .use(Button);
export default {
  name: "StudentGridSelector",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    classId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      srhName: "",
      list: [],
      val: this.value
    };
  },
  created() {
    //  传入非空再调用接口
    this.classId && this.getClassStudent();
  },
  methods: {
    // 切换选中或非选
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    // 全选
    pickAll() {
      // 比对两个数组，选中未选的
      let i = 0;
      for (const item of this.list) {
        this.value.includes(item.id) || this.toggle(i);
        i++;
      }
    },
    // 反选
    pickOppsite(){
        for(let i = 0; i < this.list.length;i++){
             this.toggle(i);
        }
    },
    // 搜索，为空时返回全班学生
    onSearch(){
       this.srhName === '' ? this.getClassStudent()  :this.searchStudent()
    },
    // 获取班级学生接口
    async getClassStudent() {
      try {
        let res = await this.$api.common.getClassStudent(this.classId);
        this.list = res.data.map(item => {
          return {
            id: item.studentId,
            name: item.studentName,
            seatNumber: item.seatNumber
          };
        });
      } catch (e) {
        // eslint-disable-next-line
        console.error("​catch -> e", e);
      }
    },
    // 获取班级学生接口
    async searchStudent() {
      try {
        let res = await this.$api.common.searchClassStudent(this.classId,this.srhName);
        if(res.data.length==0){
          Toast.fail('抱歉，没有找到该学生');
        }
        this.list = res.data.map(item => {
          return {
            id: item.studentId,
            name: item.studentName,
            seatNumber: item.seatNumber
          };
        });
        
      } catch (e) {
        // eslint-disable-next-line
        console.error("​catch -> e", e);
      }
    },
  },
  watch: {
    // 监听实现联动，暂时没有想到更加易用的方法
    classId: function(newClassId) {
      this.getClassStudent(newClassId);
      this.val=[];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.btn-wrapper{
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
</style>
