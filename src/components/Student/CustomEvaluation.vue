<template>
  <div>
    <van-cell-group>
      <van-row>
        <van-col>
          <van-cell title="评分"/>
        </van-col>
        <van-col span="12">
        <van-cell>
          <van-rate v-model="score" size="24" />
        </van-cell>
        </van-col>
      </van-row>
      <van-field
        v-model="content"
        type="textarea"
        placeholder="请输入20字之内的评价内容"
        rows="3"
        autosize
        maxlength="20"
      />
      <van-cell>
        <upload-works @uploaded="getUploadWork" />
      </van-cell>
      
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue';
import { Row, Col, Rate, CellGroup, Cell } from 'vant';
import UploadWorks from "./UploadWorks";
Vue.use(Row)
    .use(Col)
    .use(Rate)
    .use(CellGroup)
    .use(Cell);
export default {
  name: "CustomEvaluation",
    components: {UploadWorks},
    model: {
    prop: "customVal",
    event: "update"
  },
  props: {
    customVal: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      content: "",
      score: 0,
      file: {}
    }
  },
  watch: {
    content: {
      handler () {
        this.customVal.content = this.content
      }
    },
    score: {
      handler () {
        this.customVal.score = this.score
      }
    },
    file: {
      handler () {
        this.customVal.file = this.file
      }
    },
    customVal: {
      handler () {
        this.content = ""
        this.score = 0
      }
    }
  },
  methods: {
    getUploadWork (file) {
      this.file = file.file
    }
  }
}
</script>

<style scoped>

</style>