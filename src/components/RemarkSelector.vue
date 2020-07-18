/* 评价列表组 -润
To use: v-model="evaluations(一个保存评价结果的数组)" :classId="classId(对应的班级id)" 
 */
<template>
  <div>
    <van-checkbox-group v-model="checkboxVal" @change="checkboxToggle">
      <van-cell-group>
        <van-cell v-for="(item,index) of list" :key="index">
          <van-checkbox slot="icon" :name="index" ref="checkboxes" checked-color="#78909c"/>
          <span slot="title" class="title">{{item.content}}</span>
          <van-rate slot :count="item.maxScore" v-model="item.score" @change="toggle(index)" />
        </van-cell>
        <!-- 自定义评分项 -->
        <van-field
          type="textarea"
          center
          clearable
          autosize
          placeholder="请输入自定义评价"
          v-model="specialItem.content"
        >
          <van-checkbox slot="left-icon" :name="-1" ref="special" checked-color="#1ab394" />
          <van-rate slot="button" :count="5" v-model="specialItem.score" @change="toggle(-1)" />
        </van-field>
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
  Checkbox,
  CheckboxGroup,
  Tag,
  Button,
  Rate
} from "vant";
import Vue from "vue";
Vue.use(Row)
  .use(Col)
  .use(Cell)
  .use(CellGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Tag)
  .use(Rate)
  .use(Button);
export default {
  name: "RemarkSelector",
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
      score: "",
      list: [
        {
          contentId: "",
          content: "",
          score: 0,
          currencyId: "",
          subcurrencyId: ""
        }
      ],
      specialItem: {
        content: "",
        score: 0
      },
      checkboxVal: []
    };
  },
  created() {
    //  传入非空再调用接口
    this.classId && this.getEvaluationTemplate();
  },
  methods: {
    //  勾选框选中非选
    checkboxToggle(data) {
      // 与父组件联动的评价列表
      const evaluations = [];
      //循环判断
      for (let item of this.list) {
        // 当前已选中
        if (data.includes(item.key)) {
          // 没分就满分,有分就忽略
          item.score == 0 && (item.score = item.maxScore);
          // 填入
          evaluations.push({
            contentId: item.templateId,
            content: item.content,
            score: item.score,
            currencyId: item.currencyId,
            subcurrencyId: item.subcurrencyId
          });
        } else {
          // 当前未选中,分数直接清零
          item.score = 0;
        }
      }
      // 自定义评价
      const specialItem = this.specialItem;
      // 选中自定义评价
      if (data.includes(-1)) {
        specialItem.score = 5;
        this.specialItem = specialItem;
        evaluations.push({
            contentId: -1,
            content: specialItem.content,
            score: specialItem.score,
            currencyId: 7,
            subcurrencyId: 1,
        });
      } else {
        specialItem.score = 0;
        this.specialItem = specialItem;
      }
      // 调用排序已实现数组监听,模板很少所以可以
      this.list.sort();
        // 更新v-model   
      this.$emit('update',evaluations);
    },
    // 打分自动勾选
    toggle(index) {
      //选中对应的dom对象
      const checkbox =
        index === -1 ? this.$refs.special : this.$refs.checkboxes[index];
      // 有分就选中
      if (!checkbox.checked) {
        checkbox.toggle();
      }
    },
    // 评价模板接口
    async getEvaluationTemplate() {
      try {
        let res = await this.$api.remark.getEvaluationTemplate(this.classId);
        // 为数组增加score数组方便循环初始化
        this.list = res.data.map((item, index) => {
          item["score"] = 0;
          item["key"] = index;
          return item;
        });
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    }
  },
  watch: {
    // 监听实现联动，暂时没有想到更加易用的方法
    classId: function() {
      this.getEvaluationTemplate();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.title {
  margin-left: 8px;
}
</style>
