<template>
  <div class="feed">
    <van-cell
      :value="content.senderName"
      size="large"
      :label="createTime"
      @click="readMessage"
    >
      <template slot="title">
        <h4 :class="{'message-title__read':isRead}">{{content.className}}</h4>
      </template>
    </van-cell>
    <van-popup v-model="show" center round position="center" class="messageModel">
          <van-cell :title="content.className" value-class="btn-close" title-class="msg-title">
            <template slot>
              <van-button icon="cross" @click="show=false"></van-button>
            </template>
          </van-cell>

      <p class="textp">{{content.content}}</p>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { getDateDiff, deleteSec } from "@/common/time";
import { Row, Col, SwipeCell, Cell, CellGroup, Tag, Popup,Button } from "vant";
Vue.use(Row)
  .use(Col)
  .use(SwipeCell)
  .use(Cell)
  .use(CellGroup)
  .use(Tag)
  .use(Popup)
  .use(Button);

export default {
  name: "Massage",
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      read: this.content.isRead || 0,
      id: this.content.id,
      show: false
    };
  },
  computed: {
    createTime() {
      return getDateDiff(deleteSec(this.content.createTime));
    },
    isRead() {
      return this.read ? true : false;
    }
  },
  methods: {
    readMessage(){
        this.show = true
        this.postRead()
    },
    //已读接口
    async postRead() {
      try {
        await this.$api.inform.read(this.id);
        this.read = 1;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.message {
  &-title {
    margin: 7px 0;
    padding: 0;
    font-size: 14px;
    width: 300px;
    &__read {
      color: $grey-word;
    }
  }
}
.messageModel {
  width: 80%;
  min-height: 30%;
}
.msg-title{
  @include m-auto;
  font-size: 16px;
  color: $primary;
}
.textp{
    margin: 10px;
    font-weight: 200;
    padding: 5px;
}
.btn-close{
  max-width: 20px;
}
</style>