<template>
  <div>
    <van-tabs :ellipsis="false" swipe-threshold="2" color="#78909c" v-model="active">
      <van-tab :title="item" v-for="item of activityName" :key="item">
        <article class="feed" v-for="item of info" :key="item.productId">
          <div @click="popupShow = true;productId = item.productId">
            <van-row
              gutter="10"
              type="flex"
              justify="space-around"
              class="feed-row"
              @click="popupShow = !popupShow"
            >
              <van-col span="16" class="feed-row__left">
                <van-row>
                  <van-col span="24">
                    <span class="feed-title van-hairline--bottom">
                      <!-- <van-tag
                        :type="topicTag"
                        plain
                        size="medium"
                        color="#78909c"
                      >{{}}</van-tag>-->
                      &nbsp;
                      {{item.productName}}
                      <span
                        class="feed-title__author"
                      >{{item.teamName}}</span>
                    </span>
                  </van-col>
                  <van-col span="24">
                    <div class="feed-content">{{item.scoreTemplate}}</div>
                  </van-col>
                  <van-col span="24">
                    <div class="feed-bottom">
                      <span class="feed-bottom__time">{{dasd}}</span>
                      ·
                      <span class="feed-bottom__course">{{dasdas}}</span>
                    </div>
                  </van-col>
                </van-row>
              </van-col>
              <van-col span="8" class="feed-row__right">
                <van-image
                  fit="cover"
                  width="31vw"
                  height="31vw"
                  lazy-load
                  :src="`https://zhsj.bnuz.edu.cn/ComprehensiveSys${item.productUrl}`"
                  class="feedfeed-row__right-img"
                />
                <van-tag
                  mark
                  type="danger"
                  class="feed-row__right-tag"
                  size="medium"
                  v-if="item.score"
                >{{`${item.score}星`}}</van-tag>
              </van-col>
            </van-row>
          </div>
          <van-popup
            v-model="popupShow"
            position="bottom"
            round
            class="feed-popup"
            get-container="body"
          >
            <div style="height:50px;display:flex;justify-content:center;align-items:center">
              <van-rate v-model="value" />
            </div>
            <van-field
              v-model="content"
              label="评语"
              type="textarea"
              placeholder="请输入评语"
              rows="1"
              autosize
            />
            <van-row type="flex" justify="center" style="margin:15px 0;">
              <van-col span="16">
                <van-button
                  type="primary"
                  block
                  round
                  :loading="postLoading"
                  @click="evaluateStudentWorks"
                >评价</van-button>
              </van-col>
            </van-row>
          </van-popup>
        </article>
        <div style="height:50px"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {
  Button,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
  Row,
  Col,
  Image,
  Lazyload,
  Tag,
  RadioGroup,
  Radio,
  CellGroup,
  Cell,
  Field,
  Rate,
} from "vant";
import Vue from "vue";
Vue.use(Button)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Tabs)
  .use(Tab)
  .use(Row)
  .use(Col)
  .use(Image)
  .use(Lazyload)
  .use(Tag)
  .use(RadioGroup)
  .use(Radio)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Rate);
export default {
  name: "ActivityWork",
  data() {
    return {
      data: [],
      activity: new Map(),
      activityName: [],
      info: [],
      active: 0,
      popupShow: false,
      value: "3",
      content: "",
      productId: ""
    };
  },
  methods: {
    async getActivityProduct() {
      try {
        this.data = []
        for(let i=0;i<this.activityName.length;i++){
            this.data.push([])
        }
        let res = await this.$api.works.getActivityProduct();
        let activityArray = res.data;
        let index = 0;
        for (let i in activityArray) {
          if (this.activity.has(activityArray[i].activityName)) {
            this.data[this.activity.get(activityArray[i].activityName)].push(
              activityArray[i]
            );
          } else {
            this.activity.set(activityArray[i].activityName, index);
            this.activityName.push(activityArray[i].activityName);
            let arr = [activityArray[i]];
            this.data.push(arr);
            index++;
          }
        }
        this.info = this.data[this.active]
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    async evaluateActivityProduct(productId, score, scoreTemplate) {
      try {
            await this.$api.works.evaluateActivityProduct(
          productId,
          score,
          scoreTemplate
        );
          this.content = "";
          this.popupShow = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    evaluateStudentWorks() {
      this.evaluateActivityProduct(this.productId, this.value, this.content);
      this.getActivityProduct()
    }
  },
  created() {
    this.getActivityProduct();
  },
  watch:{
      active(){
          this.info = this.data[this.active]
      },
      data(){
          
      }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.feed {
  height: 140px;
  background: $white;
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
  //   @extend .overlay
  &-row {
    width: 100%;
    height: 100%;
    &__right {
      @include m-auto;
      position: relative;
      &-img {
        width: 100px;
        height: 100px;
      }
      &-tag {
        position: absolute;
        right: 90px;
        top: 15px;
      }
    }
  }
  &-title {
    @include m-auto;
    width: 100%;
    height: 100%;
    font-weight: 550;
    font-size: 110%;
    margin-left: 5px;
    margin-top: 5px;
    justify-content: flex-start;
    border-color: $primary;
    color: $primary;
    &__author {
      margin-left: auto;
      margin-right: 3px;
      font-size: 12px;
      color: $grey-word;
    }
  }
  &-content {
    margin-left: 5px;
    margin-top: 5px;
    @extend .p;
  }
  &-bottom {
    margin-left: 5px;
    margin-top: 5px;
    font-size: 12px;
    color: $grey-word;
    //   &__time{
    //     font-size: 12px;
    //     color: $grey-word;
    //   }
    //   &__course{
    //     font-size: 12px;
    //     color: $grey-word;
    //   }
  }
  // &-popup {
  //   height: 150px;
  // }
}
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: $black;
  opacity: 0.1;
  z-index: 300;
  overflow: hidden;
}
</style>