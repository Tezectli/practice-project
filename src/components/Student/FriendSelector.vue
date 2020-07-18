<template>
  <div>
    <van-checkbox-group v-model="friendList" @change="checkBoxToggle">
      <van-cell-group title="同伴列表">
        <van-row v-if="list.length !==0">
          <van-col span="8" v-for="(item, index) in list" :key="index">
            <van-cell clickable @click="toggle(index)">
              <template slot="title">
                <span class="title">{{item.name}}</span>
              </template>
              <van-checkbox
                :name="item.id"
                ref="checkboxes"
                slot="right-icon"
                checked-color="#1ab394"
              />
            </van-cell>
          </van-col>
        </van-row>
        <van-row v-else>
          <van-cell>暂无小伙伴,快点去添加吧！</van-cell>
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
    Checkbox,
    CheckboxGroup,
    Tag,
    Button
} from "vant";
import Vue from "vue";
Vue.use(Row)
    .use(Col)
    .use(Cell)
    .use(CellGroup)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Tag)
    .use(Button);
export default {
  name: "FriendSelector",
  model: {
    prop: "friendList",
    event: "change"
  },
  props: {
    friendList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      list: []
    };
  },
  created () {
    this.getFriendList()
  },
  methods: {
    // 切换选中或非选
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    checkBoxToggle () {
      this.$emit('change', this.friendList)
    },
    // 获取同伴
    async getFriendList() {
      try {
        let res = await this.$api.evaluation.getFriendList();
        this.list = res.data.map(item => {
          return {
            id: item.studentId,
            name: item.studentName
          };
        });
        // 默认选中第一位同伴
        this.friendList.push(this.list[0].id)
      } catch (e) {
        // eslint-disable-next-line
        console.error("​catch -> e", e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>