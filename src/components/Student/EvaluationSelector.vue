<template>
  <div>
    <van-checkbox-group v-model="checkboxVal" @change="checkBoxToggle">
      <van-cell-group title="评价列表">
        <van-cell-group v-for="(item, index) in list" :key="index">
          <van-cell
            clickable
            v-for="(itemSon, index) in item.templateList"
            :key="index"
            :title="itemSon.content"
          >
            <van-checkbox
              ref="checkboxes"
              :name="itemSon"
              slot="right-icon"
              checked-color="#3d8af2"
            />
          </van-cell>
        </van-cell-group>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>

<script>
import Vue from 'vue';
import { Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant';

Vue.use(Checkbox).use(CheckboxGroup).use(Cell).use(CellGroup);
export default {
  name: "EvaluationSelector",
  model: {
    prop: "checkboxVal",
    event: "change"
  },
  props: {
    target: {
      type: Number,
      required: true
    },
    checkboxVal: {
      type: Array,
      required: true
    },
    historyEvaluation: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      list: [],
      week: 0
    }
  },
  created() {
    this.initTemplate()
  },
  watch: {
    historyEvaluation () {
      if (this.historyEvaluation.length !== 0) {
        this.initTemplate()
      }
    }
  },
  methods: {
    // 获取评价模版
    async initTemplate () {
      try {
        let res = await this.$api.evaluation.initTemplate(this.target);
        this.list = res.data.map(item => {
          return {
            currencyName: item.currencyName,
            templateList: item.templateList
          }
        });
        this.renderHistoryEvaluation()
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 渲染历史评价
    renderHistoryEvaluation () {
      this.historyEvaluation.map(item => {
        this.list.map(i => {
          i.templateList.map(y => {
            if (item.templateId === y.templateId) {
              this.checkboxVal.push(y);
            }
          })
        })
      });
    }
    ,
    checkBoxToggle () {
      this.$emit('change', this.checkboxVal)
    }
  }
}
</script>

<style scoped>

</style>